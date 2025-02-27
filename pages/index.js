import React, { useState, useEffect } from "react";
import Head from "next/head";
import YouTube from "react-youtube";
import { Card, CardBody, Image, Button, Slider, ScrollShadow, Navbar } from "@heroui/react";
import { Input } from "@heroui/input";
import {Avatar} from "@heroui/react";


// ICONS
export const HeartIcon = ({ size = 24, strokeWidth = 1.5, fill = "none", ...props }) => (
  <svg
    aria-hidden="true"
    fill={fill}
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const PauseCircleIcon = ({ size = 24, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M11.97 2C6.45 2 2 6.48 2 12s4.45 10 9.97 10S22 17.52 22 12 17.49 2 11.97 2zm-1.26 13.03c0 .48-.2.67-.71.67H8.71c-.51 0-.71-.2-.71-.67V8.97c0-.48.2-.67.71-.67h1.29c.51 0 .71.2.71.67v6.06zm5 0c0 .48-.2.67-.71.67h-1.29c-.51 0-.71-.2-.71-.67V8.97c0-.48.2-.67.71-.67h1.29c.51 0 .71.2.71.67v6.06z"
      fill="currentColor"
    />
  </svg>
);

export const PlayCircleIcon = ({ size = 24, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <polygon points="9,8 16,12 9,16" fill="currentColor" />
  </svg>
);

export const NextIcon = ({ size = 24, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M3.76 7.22v9.57c0 2.0 2.13 3.23 3.83 2.25l4.15-2.39 4.15-2.4c1.7-.98 1.7-3.43 0-4.42l-4.15-2.4L7.59 3.08C5.89 2.1 3.76 3.33 3.76 5.31z"
      fill="currentColor"
    />
    <path
      d="M20.24 18.93c-.41 0-.75-.34-.75-.75V5.82c0-.41.34-.75.75-.75s.75.34.75.75v12.36c0 .41-.34.75-.75.75z"
      fill="currentColor"
    />
  </svg>
);

export const PreviousIcon = ({ size = 24, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M20.24 7.22v9.57c0 2.0-2.13 3.23-3.83 2.25l-4.15-2.39-4.15-2.4C5.89 12.1 5.89 9.65 7.59 8.66l4.15-2.4 4.15-2.39c1.7-.98 3.83.25 3.83 2.23z"
      fill="currentColor"
    />
    <path
      d="M3.76 18.93c.41 0 .75-.34.75-.75V5.82c0-.41-.34-.75-.75-.75s-.75.34-.75.75v12.36c0 .41.34.75.75.75z"
      fill="currentColor"
    />
  </svg>
);

export const RepeatOneIcon = ({ size = 24, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M3.91 17.18c-.19 0-.38-.07-.53-.22C2.01 15.58 1.25 13.76 1.25 11.83 1.25 7.82 4.5 4.56 8.5 4.56l6.07.02-1.09-1.04c-.3-.29-.29-.76.02-1.06.29-.3.75-.29 1.04.02l2.44 2.34c.22.22.34.52.34.83 0 .31-.12.61-.34.83l-2.5 2.67c-.29.31-.76.33-1.07.04-.31-.29-.37-.77-.11-1.09l1.5-1.67V9.33c0-.41-.34-.74-.75-.74zM10 21.75c-.19 0-.38-.07-.53-.22l-2.44-2.34c-.31-.29-.33-.76-.04-1.07.29-.31.76-.33 1.07-.04l2.5 2.5c.16.16.39.24.62.24.22 0 .44-.08.61-.24l1.09-.55c.29-.15.44-.49.39-.79-.05-.3-.3-.5-.59-.5H8.42z"
      fill="currentColor"
    />
  </svg>
);

export const ShuffleIcon = ({ size = 24, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path
      d="M21.75 17.98c0-.02 0-.04-.01-.06-.01-.09-.02-.17-.04-.25-.04-.09-.09-.17-.15-.25-.04-.07-.1-.14-.16-.21-.01-.01-.02-.02-.03-.04-.06-.06-.13-.11-.21-.16-.09-.04-.18-.07-.27-.09L16.33 17.23c0 0 0 0 0-.01-.05 0-.1 0-.15-.01-.5 0-1-.26-1.3-.69L13.56 14.92c-.25-.33-.24-.8.02-1.1.26-.3.68-.33 1-.07l1.48 1.34c.74.67 1.77 1.1 2.83 1.1h.01l3.85-.01c.41 0 .75.34.75.75s-.34.75-.75.75l-2.01.02zM8.42 6.69c-.65-.9-1.68-1.43-2.79-1.43-.01 0-.01 0-.02 0H3c-.41 0-.75.34-.75.75S2.59 6 3 6h2.6c.39 0 .74.27.83.65l1.08 2.5c.23.54.74.91 1.33.91.18 0 .36-.03.53-.1l1.09-.55c.29-.15.44-.49.39-.79-.05-.3-.3-.5-.59-.5H8.42zM21.74 6.08c0-.02.01-.04.01-.06 0-.1-.01-.2-.04-.29-.04-.1-.1-.18-.17-.25l-2-2.27c-.31-.29-.77-.29-1.08 0-.31.3-.31.79 0 1.09l.71.81-3.74-.01c-.41 0-.75.34-.75.75s.34.75.75.75l3.71.01-.71.81c-.31.3-.31.79 0 1.09.29.31.77.31 1.08 0l2-2.27c.07-.08.12-.17.16-.27.03-.09.04-.19.04-.29z"
      fill="currentColor"
    />
  </svg>
);

export default function App() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  // Fetch playlist from MongoDB on mount
  useEffect(() => {
    async function fetchPlaylist() {
      const res = await fetch("/api/playlist");
      const json = await res.json();
      if (json.success) {
        setPlaylist(json.data);
        if (json.data.length > 0 && currentIndex === null) {
          setCurrentIndex(0);
        }
      }
    }
    fetchPlaylist();
  }, []);

  // Extract video ID from YouTube URL
  const extractVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtube.com"))
        return urlObj.searchParams.get("v");
      if (urlObj.hostname.includes("youtu.be"))
        return urlObj.pathname.slice(1);
    } catch (error) {
      console.error("Invalid URL", error);
    }
    return null;
  };

  // Load track into MongoDB and update local playlist
  const handleLoad = async () => {
    const id = extractVideoId(youtubeUrl);
    if (id) {
      if (playlist.some((track) => track.videoId === id)) {
        alert("Music already exists in the playlist!");
        return;
      }
      // Fetch video metadata using YouTube oEmbed endpoint
      try {
        const resOembed = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
        );
        const data = await resOembed.json();
        const newTrack = { videoId: id, url: youtubeUrl, title: data.title };
        const res = await fetch("/api/playlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTrack),
        });
        if (res.status === 409) {
          alert("Music already exists in the playlist!");
        } else if (res.ok) {
          const json = await res.json();
          setPlaylist((prev) => [...prev, json.data]);
          if (currentIndex === null) setCurrentIndex(0);
          setYoutubeUrl("");
        }
      } catch (error) {
        console.error("Failed to fetch video metadata", error);
        alert("Failed to fetch video metadata. Please try again.");
      }
    } else {
      alert("Please enter a valid YouTube URL");
    }
  };

  // Next/Previous functions
  const handleNext = () => {
    if (currentIndex !== null && currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const currentTrack =
    currentIndex !== null && playlist[currentIndex] ? playlist[currentIndex] : null;
  const videoId = currentTrack ? currentTrack.videoId : "";

  // YouTube player ready callback
  const onReady = (event) => {
    const ytPlayer = event.target;
    setPlayer(ytPlayer);
    setDuration(ytPlayer.getDuration());
  };

  // Update current time periodically
  useEffect(() => {
    let timer;
    if (player) {
      timer = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [player]);

  const handleSliderChange = (value) => {
    if (player) {
      player.seekTo(value, true);
      setCurrentTime(value);
    }
  };

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.playVideo();
        setIsPlaying(true);
      }
    }
  };

  // Hidden YouTube player options (audio-only)
  const opts = {
    height: "0",
    width: "0",
    playerVars: { autoplay: 0, controls: 0 },
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const imageSrc = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "https://heroui.com/images/album-cover.png";

  return (
    <>
      <Head>
        <title>YouTube Audio Player with Playlist</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar>
          <Input
            placeholder="Paste YouTube URL here"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <Button onPress={handleLoad}>Load</Button>
      </Navbar>
      <div className="app-container">
        {/* Input Section */}
       

        <div className="main-content">
          {/* Player Section */}
          <div className=" player-container">
            <Card className="player-card" isBlurred shadow="sm">
              <CardBody>
                <div className="grid-container">
                  <div className="album-cover">
                    
                    <Image
                      alt="Video Thumbnail"
                      className="object-cover"
                      height={200}
                      shadow="md"
                      src={imageSrc}
                      width="100%"
                    />
                  </div>
                  <div className="player-details">
                    <div className="header">
                      <div className="info">
                        <h3>{currentTrack ? currentTrack.title : "Daily Mix"}</h3>
                        <p>{playlist.length} Tracks</p>
                      </div>
                      <Button
                        isIconOnly
                        className="like-btn"
                        radius="full"
                        variant="light"
                        onPress={() => setLiked((v) => !v)}
                      >
                        <HeartIcon
                          className={liked ? "[&>path]:stroke-transparent" : ""}
                          fill={liked ? "currentColor" : "none"}
                        />
                      </Button>
                    </div>
                    <div className="slider-section">
                      {/* <Slider
                        aria-label="Music progress"
                        classNames={{
                          track: "bg-default-500/30",
                          thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                        }}
                        color="foreground"
                        value={currentTime}
                        min={0}
                        max={duration}
                        width="100%"
                        onChange={handleSliderChange}
                        size="sm"
                      /> */}
                      <Slider
                      value={currentTime/duration*100}
                      min={0}
                      max={100}
                      onChange={(value) => handleSliderChange(value/100*duration)}
                        classNames={{
                          base: "max-w-md gap-3",
                          track: "border-s-secondary-100",
                          filler: "bg-gradient-to-r from-secondary-100 to-secondary-500",
                        }}
                        defaultValue={0}
                        label="Select brightness"
                        renderThumb={(props) => (
                          <div
                            {...props}
                            className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                          >
                            <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                          </div>
                        )}
                        size="sm"
                      />
                      <div className="time-display">
                        <p>{formatTime(currentTime)}</p>
                        <p>{formatTime(duration)}</p>
                      </div>
                    </div>
                    <div className="controls">
                      <Button isIconOnly radius="full" variant="light" onPress={handlePrevious}>
                        <PreviousIcon className="icon" />
                      </Button>
                      <Button isIconOnly radius="full" variant="light" onPress={togglePlayPause}>
                        {isPlaying ? <PauseCircleIcon size={54} /> : <PlayCircleIcon size={54} />}
                      </Button>
                      <Button isIconOnly radius="full" variant="light" onPress={handleNext}>
                        <NextIcon className="icon" />
                      </Button>
                     
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Playlist Section */}
        <div className="overflow-y-auto playlist-container">
            <Card isBlurred shadow="sm">
              <CardBody>
                <h3>Playlist</h3>
                {playlist.length === 0 ? (
                  <p>No tracks added yet.</p>
                ) : (
                  <ul className="playlist-list">
                    {playlist.map((track, index) => (
                      <li
                        key={index}
                        className={`playlist-item ${currentIndex === index ? "active" : ""}`}
                        onClick={() => {
                          setCurrentIndex(index);
                          setCurrentTime(0);
                          setIsPlaying(false);
                        }}
                      >
                        <Image
                          alt="Thumbnail"
                          src={`https://img.youtube.com/vi/${track.videoId}/hqdefault.jpg`}
                          width={80}
                          height={45}
                          shadow="sm"
                        />
                              {/* <Avatar size="md" 
                          src={`https://img.youtube.com/vi/${track.videoId}/hqdefault.jpg`} /> */}

                        <span>{track.title || `Track ${index + 1}`}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>
            
          </div>
        </div>

        {/* Hidden YouTube Player */}
        {videoId && (
          <div style={{ position: "absolute", left: "-9999px" }}>
            <YouTube key={videoId} videoId={videoId} opts={opts} onReady={onReady} />
          </div>
        )}
      </div>
      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .input-section {
          display: flex;
          gap: 10px;
          width: 100%;
          max-width: 600px;
          margin-bottom: 20px;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 1200px;
        }
        @media (min-width: 768px) {
          .main-content {
            flex-direction: row;
          }
        }
        .player-container {
          flex: 2;
        }
        .playlist-container {
          flex: 1;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
          align-items: center;
        }
        @media (min-width: 768px) {
          .grid-container {
            grid-template-columns: repeat(12, 1fr);
          }
        }
        .album-cover {
          grid-column: span 6;
        }
        @media (min-width: 768px) {
          .album-cover {
            grid-column: span 4;
          }
        }
        .player-details {
          grid-column: span 6;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        @media (min-width: 768px) {
          .player-details {
            grid-column: span 8;
          }
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .info h3 {
          margin: 0;
          font-weight: 600;
          color: #1f2937;
        }
        .info p {
          margin: 0;
          color: #4b5563;
          font-size: 0.875rem;
        }
        .like-btn {
          transform: translate(8px, -8px);
        }
        .slider-section {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .time-display {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          color: #6b7280;
        }
        .controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }
        .icon {
          color: #374151;
        }
        .playlist-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .playlist-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .playlist-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .playlist-item.active {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}
