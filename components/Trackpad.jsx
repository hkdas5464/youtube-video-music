// components/Trackpad.jsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import YouTube from 'react-youtube';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(145deg, #ff268e 0%, #ff694f 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&::before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background: 'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&::after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background: 'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 24,
  borderRadius: 16,
  width: '100%',
  maxWidth: 800,
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(0,0,0,0.6)',
  }),
}));

const PlaylistContainer = styled('div')(({ theme }) => ({
  maxHeight: 300,
  overflowY: 'auto',
  marginTop: 16,
  padding: 8,
  borderRadius: 12,
  backgroundColor: 'rgba(255,255,255,0.1)',
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(0,0,0,0.2)',
  }),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255,255,255,0.3)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(255,255,255,0.5)',
  },
}));

const PlaylistItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  borderRadius: 8,
  marginBottom: 8,
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  backgroundColor: 'rgba(255,255,255,0.05)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  '&.active': {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(0,0,0,0.05)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.15)',
    },
    '&.active': {
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
  }),
}));

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 8,
});

export default function Trackpad() {
  const [youtubeUrl, setYoutubeUrl] = React.useState('');
  const [originalPlaylist, setOriginalPlaylist] = React.useState([]);
  const [displayedPlaylist, setDisplayedPlaylist] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [player, setPlayer] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [volume, setVolume] = React.useState(50);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  React.useEffect(() => {
    async function fetchPlaylist() {
      const res = await fetch("/api/playlist");
      const json = await res.json();
      if (json.success) {
        const shuffledPlaylist = shuffleArray(json.data);
        setOriginalPlaylist(shuffledPlaylist);
        setDisplayedPlaylist(shuffledPlaylist);
        if (shuffledPlaylist.length > 0 && currentIndex === null) {
          setCurrentIndex(0);
        }
      }
    }
    fetchPlaylist();
  }, []);

  // Media Session API Integration
  React.useEffect(() => {
    const currentTrack = currentIndex !== null && displayedPlaylist[currentIndex] ? displayedPlaylist[currentIndex] : null;
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: 'YouTube Track',
        album: 'Playlist',
        artwork: [
          {
            src: `https://img.youtube.com/vi/${currentTrack.videoId}/hqdefault.jpg`,
            sizes: '96x96',
            type: 'image/jpeg',
          },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        if (player) {
          player.playVideo();
          setIsPlaying(true);
        }
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        if (player) {
          player.pauseVideo();
          setIsPlaying(false);
        }
      });

      navigator.mediaSession.setActionHandler('nexttrack', handleNext);
      navigator.mediaSession.setActionHandler('previoustrack', handlePrevious);
    }
  }, [currentIndex, displayedPlaylist, player]);

  // Handle search filtering
  React.useEffect(() => {
    if (searchQuery.trim() === '') {
      setDisplayedPlaylist(originalPlaylist);
    } else {
      const filtered = originalPlaylist.filter((track) =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedPlaylist(filtered);
    }
  }, [searchQuery, originalPlaylist]);

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

  const handleLoad = async () => {
    const id = extractVideoId(youtubeUrl);
    if (id) {
      if (originalPlaylist.some((track) => track.videoId === id)) {
        alert("Music already exists in the playlist!");
        return;
      }
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
          setOriginalPlaylist((prev) => [...prev, json.data]);
          if (searchQuery.trim() === '' || json.data.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            setDisplayedPlaylist((prev) => [...prev, json.data]);
          }
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

  const handleDelete = async (indexToDelete) => {
    const trackToDelete = displayedPlaylist[indexToDelete];
    try {
      const res = await fetch(`/api/playlist/${trackToDelete.videoId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOriginalPlaylist((prev) => prev.filter((track) => track.videoId !== trackToDelete.videoId));
        setDisplayedPlaylist((prev) => prev.filter((_, i) => i !== indexToDelete));
        if (indexToDelete === currentIndex) {
          if (displayedPlaylist.length === 1) {
            setCurrentIndex(null);
            setIsPlaying(false);
          } else if (indexToDelete === displayedPlaylist.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex(indexToDelete);
          }
        } else if (indexToDelete < currentIndex) {
          setCurrentIndex(currentIndex - 1);
        }
      } else {
        alert("Failed to delete track from server");
      }
    } catch (error) {
      console.error("Error deleting track:", error);
      alert("Error deleting track");
    }
  };

  const handleNext = () => {
    if (currentIndex !== null) {
      if (currentIndex < displayedPlaylist.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const onReady = (event) => {
    const ytPlayer = event.target;
    setPlayer(ytPlayer);
    setDuration(ytPlayer.getDuration());
    ytPlayer.setVolume(volume);
    if (isPlaying) {
      ytPlayer.playVideo();
    }
  };

  const onStateChange = (event) => {
    if (event.data === 0 && currentIndex !== null) {
      handleNext();
    }
  };

  React.useEffect(() => {
    let timer;
    if (player) {
      timer = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [player]);

  const handleSliderChange = (_, value) => {
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

  const handleVolumeChange = (_, value) => {
    setVolume(value);
    if (player) {
      player.setVolume(value);
    }
  };

  const handleSongClick = (index) => {
    setCurrentIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
    // Clear search and collapse search bar
    setSearchQuery('');
    setSearchOpen(false);
  };

  const currentTrack = currentIndex !== null && displayedPlaylist[currentIndex] ? displayedPlaylist[currentIndex] : null;
  const videoId = currentTrack ? currentTrack.videoId : "";
  const imageSrc = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "https://via.placeholder.com/100";

  const opts = {
    height: "0",
    width: "0",
    playerVars: { autoplay: 0, controls: 0 },
  };

  const formatDuration = (value) => {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative', p: 3 }}>
      <Widget>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
          <TextField
            fullWidth
            placeholder="Paste YouTube URL here"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            size="small"
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
              '& .MuiInputBase-input': {
                padding: '8px 12px',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleLoad}
            sx={{
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
              padding: '8px 16px',
            }}
          >
            Add
          </Button>
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 100,
              height: 100,
              overflow: 'hidden',
              flexShrink: 0,
              borderRadius: 8,
              backgroundColor: 'rgba(0,0,0,0.08)',
            }}
          >
            <img src={imageSrc} alt="Track cover" style={{ width: '100%' }} />
          </Box>
          <Box sx={{ ml: 2, minWidth: 0 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              YouTube Track
            </Typography>
            <Typography noWrap sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {currentTrack ? currentTrack.title : "Select a track"}
            </Typography>
            <Typography noWrap sx={{ letterSpacing: -0.25, color: 'text.secondary' }}>
              Playlist — {originalPlaylist.length} tracks
            </Typography>
          </Box>
          <IconButton
            sx={{ ml: 'auto' }}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <FavoriteRounded color="error" />
            ) : (
              <FavoriteBorderRounded />
            )}
          </IconButton>
        </Box>

        <Slider
          aria-label="time-indicator"
          size="small"
          value={currentTime}
          min={0}
          step={1}
          max={duration}
          onChange={handleSliderChange}
          sx={(t) => ({
            color: 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
            ...t.applyStyles('dark', {
              color: '#fff',
            }),
          })}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
            mb: 2,
          }}
        >
          <TinyText>{formatDuration(currentTime)}</TinyText>
          <TinyText>-{formatDuration(duration - currentTime)}</TinyText>
        </Box>

        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
            mb: 2,
            '& svg': {
              color: '#000',
              ...theme.applyStyles('dark', {
                color: '#fff',
              }),
            },
          })}
        >
          <IconButton aria-label="previous song" onClick={handlePrevious}>
            <FastRewindRounded fontSize="large" />
          </IconButton>
          <IconButton
            aria-label={isPlaying ? 'pause' : 'play'}
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <PauseRounded sx={{ fontSize: '3rem' }} />
            ) : (
              <PlayArrowRounded sx={{ fontSize: '3rem' }} />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={handleNext}>
            <FastForwardRounded fontSize="large" />
          </IconButton>
        </Box>

        <Stack
          spacing={2}
          direction="row"
          sx={(theme) => ({
            mb: 2,
            px: 1,
            '& > svg': {
              color: 'rgba(0,0,0,0.4)',
              ...theme.applyStyles('dark', {
                color: 'rgba(255,255,255,0.4)',
              }),
            },
          })}
          alignItems="center"
        >
          <VolumeDownRounded />
          <Slider
            aria-label="Volume"
            value={volume}
            onChange={handleVolumeChange}
            sx={(t) => ({
              color: 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&::before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
              ...t.applyStyles('dark', {
                color: '#fff',
              }),
            })}
          />
          <VolumeUpRounded />
        </Stack>

        {/* Search Bar with Expandable Icon */}
        <SearchContainer>
          <IconButton
            onClick={() => setSearchOpen(!searchOpen)}
            sx={{
              color: 'rgba(0,0,0,0.54)',
              '&:hover': {
                color: 'rgba(0,0,0,0.87)',
              },
              '.dark &': {
                color: 'rgba(255,255,255,0.54)',
                '&:hover': {
                  color: 'rgba(255,255,255,0.87)',
                },
              },
            }}
          >
            <SearchRounded />
          </IconButton>
          <Collapse in={searchOpen} orientation="horizontal" sx={{ flex: 1 }}>
            <TextField
              fullWidth
              placeholder="Search playlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
                '& .MuiInputBase-input': {
                  padding: '8px 12px',
                },
              }}
            />
          </Collapse>
        </SearchContainer>

        <PlaylistContainer>
          {displayedPlaylist.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 2, color: 'text.secondary' }}>
              {searchQuery.trim() ? "No tracks found" : "No tracks added yet"}
            </Typography>
          ) : (
            displayedPlaylist.map((track, index) => (
              <PlaylistItem
                key={track.videoId} // Use videoId as key to ensure uniqueness
                className={currentIndex === index ? 'active' : ''}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flex: '1 1 auto',
                      minWidth: 0,
                    }}
                    onClick={() => handleSongClick(index)}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        overflow: 'hidden',
                        flexShrink: 0,
                        borderRadius: 4,
                        backgroundColor: 'rgba(0,0,0,0.08)',
                        mr: 2,
                      }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${track.videoId}/hqdefault.jpg`}
                        alt={track.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <Box
                      sx={{
                        flex: '1 1 auto',
                        minWidth: 0,
                        maxWidth: 'calc(100% - 88px)',
                      }}
                    >
                      <Typography
                        noWrap
                        sx={{
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          color: currentIndex === index ? 'text.primary' : 'text.secondary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {track.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: '0 0 48px', display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                      aria-label="delete song"
                      onClick={() => handleDelete(index)}
                      sx={{
                        color: 'rgba(0,0,0,0.54)',
                        '&:hover': {
                          color: 'rgba(0,0,0,0.87)',
                        },
                        '.dark &': {
                          color: 'rgba(255,255,255,0.54)',
                          '&:hover': {
                            color: 'rgba(255,255,255,0.87)',
                          },
                        },
                      }}
                    >
                      <DeleteRounded fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </PlaylistItem>
            ))
          )}
        </PlaylistContainer>
      </Widget>

      {videoId && (
        <div style={{ position: 'absolute', left: '-9999px' }}>
          <YouTube
            key={videoId}
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        </div>
      )}
      <WallPaper />
    </Box>
  );
}