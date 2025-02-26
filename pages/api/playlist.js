// pages/api/playlist.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

const options = {};

// Use a global variable in development to preserve the connection across hot reloads
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("playlistDB"); // Use your chosen database name
    const collection = db.collection("tracks");

    if (req.method === "GET") {
      const tracks = await collection.find({}).toArray();
      res.status(200).json({ success: true, data: tracks });
    } else if (req.method === "POST") {
      const track = req.body;
      if (!track || !track.videoId || !track.url) {
        res.status(400).json({ success: false, error: "Invalid track data" });
        return;
      }
      // Check for duplicate
      const existing = await collection.findOne({ videoId: track.videoId });
      if (existing) {
        res.status(409).json({ success: false, error: "Track already exists" });
        return;
      }
      const result = await collection.insertOne(track);
      res.status(201).json({ success: true, data: { ...track, _id: result.insertedId } });
    } else {
      res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
