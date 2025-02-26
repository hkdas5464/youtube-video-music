// pages/api/convert.js
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { PassThrough } from 'stream';

ffmpeg.setFfmpegPath(ffmpegPath);

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !ytdl.validateURL(url)) {
    res.status(400).json({ error: 'Invalid YouTube URL' });
    return;
  }

  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');

  try {
    const stream = ytdl(url, { quality: 'highestaudio' });
    // Log errors from ytdl-core
    stream.on('error', (error) => {
      console.error('ytdl error:', error);
    });

    const passThrough = new PassThrough();

    ffmpeg(stream)
      .audioBitrate(128)
      .format('mp3')
      .on('error', (err) => {
        console.error('ffmpeg error:', err);
        // Sending error response might not work if headers have already been sent.
        // Consider ending the response here.
        res.status(500).end('Error converting video to MP3');
      })
      .on('end', () => {
        console.log('Conversion complete');
      })
      .pipe(passThrough);

    passThrough.pipe(res);
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Conversion failed' });
  }
}
