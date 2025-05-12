import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Settings, SkipForward, SkipBack } from 'lucide-react';
import YouTube from 'react-youtube';
import { machineLearningModules } from '../pages/courses/MachineLearningCourse';
import { pythonDataScienceModules } from '../pages/courses/PythonDataScienceCourse';
import { reactModules } from '../pages/courses/ReactCourse';
import { webDevelopmentModules } from '../pages/courses/WebDevelopmentCourse';
import {javaProgrammingModules} from '../pages/courses/JavaProgrammingCourse';
import {reactNativeModules} from '../pages/courses/ReactNativeCourse';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const { courseId, videoId } = useParams();
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quality, setQuality] = useState('auto');
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [isChangingVideo, setIsChangingVideo] = useState(false);
  const [submodules, setSubmodules] = useState([]);
  const videoRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const playAttemptRef = useRef(null);
  const [currentSubmodule, setCurrentSubmodule] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef(null);
  const thumbnailCanvasRef = useRef(null);

  const handleSubmoduleClick = useCallback((index) => {
    setCurrentSubmodule(index);
    const startTime = submodules[index].start;
    if (isYouTubeVideo(videos[currentIndex]?.videoUrl) && youtubePlayerRef.current) {
      youtubePlayerRef.current.seekTo(startTime, true);
    } else if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
    setIsPlaying(true);
  }, [currentIndex, submodules, videos, youtubePlayerRef]);

  const handleModuleClick = useCallback((index) => {
    setIsChangingVideo(true);
    if (playAttemptRef.current) {
      playAttemptRef.current.then(() => {
        setCurrentIndex(index);
        setCurrentSubmodule(0);
        setIsPlaying(true);
        setIsChangingVideo(false);
      }).catch(() => {
        setCurrentIndex(index);
        setCurrentSubmodule(0);
        setIsPlaying(true);
        setIsChangingVideo(false);
      });
    } else {
      setCurrentIndex(index);
      setCurrentSubmodule(0);
      setIsPlaying(true);
      setIsChangingVideo(false);
    }
  }, [setIsChangingVideo, setCurrentIndex, setCurrentSubmodule, setIsPlaying]);

  const fetchVideos = useCallback(() => {
    let moduleData;
    switch (courseId) {
      case 'machine-learning':
        moduleData = machineLearningModules;
        break;
      case 'python-data-science':
        moduleData = pythonDataScienceModules;
        break;
      case 'react':
        moduleData = reactModules;
        break;
      case 'web-development':
        moduleData = webDevelopmentModules;
        break;
        case 'java-programming':
        moduleData = javaProgrammingModules;
        break;
        case 'react-native':
        moduleData =reactNativeModules;
        break;
        
      default:
        setError('Invalid course ID');
        return;
    }

    setVideos(moduleData);
    const initialVideoIndex = moduleData.findIndex(video => video.id === videoId);
    setCurrentIndex(initialVideoIndex !== -1 ? initialVideoIndex : 0);
    setIsLoading(false);
  }, [courseId, videoId]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    if (duration > 180) { 
      const submoduleCount = Math.ceil(duration / 180);
      let newSubmodules = Array.from({ length: submoduleCount }, (_, i) => ({
        start: i * 180,
        end: (i === submoduleCount - 1) ? duration : (i + 1) * 180,
        title: `Submodule ${i + 1}`
      }));

      if (newSubmodules.length > 1 && (newSubmodules[newSubmodules.length - 1].end - newSubmodules[newSubmodules.length - 1].start) < 60) {
        newSubmodules[newSubmodules.length - 2].end = duration;
        newSubmodules.pop();
      }

      setSubmodules(newSubmodules);
    } else {
      setSubmodules([]);
    }
  }, [duration]);

  const isYouTubeVideo = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  const isDropboxVideo = (url) => {
    return url && (url.includes('dropbox.com') || url.includes('dl.dropboxusercontent.com'));
  };

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getDropboxQualityUrl = (url, quality) => {
    if (url.includes('dl.dropboxusercontent.com')) {
      return url;
    }
    let directLink = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    directLink = directLink.replace('?dl=0', '');
    const qualitySuffix = quality === 'auto' ? '' : `?raw=1&quality=${quality}`;
    return `${directLink}${qualitySuffix}`;
  };

  useEffect(() => {
    if (videos[currentIndex]?.videoUrl && !isYouTubeVideo(videos[currentIndex].videoUrl)) {
      const video = videoRef.current;
      if (!video) return;

      const handleCanPlay = () => {
        setError(null);
        setIsLoading(false);
      };

      const handleError = (e) => {
        console.error('Video error:', e);
        setError('This video cannot be played. It may be unsupported or the source is invalid.');
        setIsLoading(false);
      };

      const handleLoadedMetadata = () => {
        setDuration(video.duration);
      };

      const handleTimeUpdate = () => { 
        const video = videoRef.current;
        if (!video) return;

        const currentTime = video.currentTime;
        setCurrentTime(currentTime);
        setProgress((currentTime / video.duration) * 100);

        if (submodules.length > 0) {
          const currentSubmoduleIndex = submodules.findIndex(
            submodule => currentTime >= submodule.start && currentTime < submodule.end
          );
          if (currentSubmoduleIndex !== -1 && currentSubmoduleIndex !== currentSubmodule) {
            setCurrentSubmodule(currentSubmoduleIndex);
          }

          if (currentTime >= submodules[currentSubmodule].end) {
            if (currentSubmodule < submodules.length - 1) {
              handleSubmoduleClick(currentSubmodule + 1);
            } else {
              handleModuleClick(currentIndex + 1);
            }
          }
        }
      };

      const handleEnded = () => {
        // Handle video end if needed
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentIndex, videos, currentSubmodule, handleSubmoduleClick, handleModuleClick, submodules]);

  useEffect(() => {
    if (videos[currentIndex]?.videoUrl) {
      if (!isYouTubeVideo(videos[currentIndex].videoUrl)) {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playAttemptRef.current = playPromise;
            playPromise.then(() => {
              playAttemptRef.current = null;
            }).catch(err => {
              if (err.name === 'AbortError') {
                console.log('Play attempt was aborted, ignoring this error');
              } else {
                console.error('Error playing video:', err);
                setIsPlaying(false);
                setError('Failed to play the video. Please try again later.');
              }
              playAttemptRef.current = null;
            });
          }
        } else {
          if (playAttemptRef.current) {
            playAttemptRef.current.then(() => {
              video.pause();
            }).catch(() => {
              // Handle error if needed
            });
          } else {
            video.pause();
          }
        }
      } else if (youtubePlayerRef.current) {
        if (isPlaying) {
          youtubePlayerRef.current.playVideo();
        } else {
          youtubePlayerRef.current.pauseVideo();
        }
      }
    }
  }, [isPlaying, currentIndex, videos]);

  const handleVideoPress = () => {
    if (error) return;
    setIsPlaying(!isPlaying);
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(err => {
        console.error('Error playing video after retry:', err);
        setError('Failed to play the video. Please try again.');
        setIsLoading(false);
      });
    }
  };

  const handleVolumeToggle = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (isYouTubeVideo(videos[currentIndex]?.videoUrl) && youtubePlayerRef.current) {
      if (isMuted) {
        youtubePlayerRef.current.unMute();
      } else {
        youtubePlayerRef.current.mute();
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const onYouTubeReady = (event) => {
    youtubePlayerRef.current = event.target;
    setDuration(event.target.getDuration());
    setIsLoading(false);
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  const onYouTubeStateChange = (event) => { 
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false);
    } else if (event.data === YouTube.PlayerState.ENDED) {
      handleModuleClick(currentIndex + 1);
    }
  };

  const onYouTubeProgress = () => {
    if (youtubePlayerRef.current) {
      const currentTime = youtubePlayerRef.current.getCurrentTime();
      const duration = youtubePlayerRef.current.getDuration();
      setCurrentTime(currentTime);
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    const currentVideo = videos[currentIndex];
    if (isYouTubeVideo(currentVideo?.videoUrl)) {
      youtubePlayerRef.current.setPlaybackQuality(newQuality);
    } else if (isDropboxVideo(currentVideo?.videoUrl)) {
      const video = videoRef.current;
      const currentTime = video.currentTime;
      video.src = getDropboxQualityUrl(currentVideo.videoUrl, newQuality);
      video.currentTime = currentTime;
      if (isPlaying) {
        video.play().catch(err => console.error('Error playing video after quality change:', err));
      }
    }
    setShowQualityOptions(false);
  };

  const handleForward = () => {
    if (isYouTubeVideo(videos[currentIndex]?.videoUrl) && youtubePlayerRef.current) {
      const newTime = youtubePlayerRef.current.getCurrentTime() + 10;
      youtubePlayerRef.current.seekTo(newTime, true);
    } else if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleBackward = () => {
    if (isYouTubeVideo(videos[currentIndex]?.videoUrl) && youtubePlayerRef.current) {
      const newTime = youtubePlayerRef.current.getCurrentTime() - 10;
      youtubePlayerRef.current.seekTo(newTime, true);
    } else if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleProgressBarClick = (e) => {
    const progressBar = progressBarRef.current
    if (!progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const x = e.clientX - rect.left
    const clickedProgress = (x / rect.width) * 100
    const newTime = (clickedProgress / 100) * duration

    if (isYouTubeVideo(videos[currentIndex]?.videoUrl) && youtubePlayerRef.current) {
      youtubePlayerRef.current.seekTo(newTime, true)
    } else if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }

    setCurrentTime(newTime)
    setProgress(clickedProgress)
  }


  const generateThumbnail = (time) => {
    if (isYouTubeVideo(videos[currentIndex]?.videoUrl)) {
      return;
    }

    const video = videoRef.current;
    const canvas = thumbnailCanvasRef.current;
    if (video && canvas) {
      video.currentTime = time;
      canvas.width = 160;
      canvas.height = 90;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  };

  const handleMouseMove = (e) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const previewTime = percentage * duration;

    setPreviewTime(previewTime);
    setShowPreview(true);

    if (previewRef.current) {
      previewRef.current.style.left = `${x}px`;
    }

    generateThumbnail(previewTime);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (isYouTubeVideo(videos[currentIndex]?.videoUrl) && youtubePlayerRef.current) {
        youtubePlayerRef.current.seekTo(previewTime, true);
      } else if (videoRef.current) {
        videoRef.current.currentTime = previewTime;
      }
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  const renderVideoPlayer = () => {
    const currentVideo = videos[currentIndex];
    if (!currentVideo?.videoUrl) {
      return <div className="error">Video URL not available</div>;
    }

    if (isYouTubeVideo(currentVideo.videoUrl)) {
      return (
        <YouTube
          videoId={getYouTubeId(currentVideo.videoUrl)}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: isPlaying ? 1 : 0,
              mute: isMuted ? 1 : 0,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            },
          }}
          onReady={onYouTubeReady}
          onStateChange={onYouTubeStateChange}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setError('An error occurred while loading the YouTube video.')}
          className="video-player__video"
        />
      );
    }

    return (
      <video
        ref={videoRef}
        src={isDropboxVideo(currentVideo.videoUrl) ? getDropboxQualityUrl(currentVideo.videoUrl, quality) : currentVideo.videoUrl}
        className="video-player__video"
        playsInline
        muted={isMuted}
        onClick={handleVideoPress}
        onError={(e) => {
          console.error('Video loading error:', e);
          setError('Failed to load the video. Please check the URL and try again.');
        }}
      />
    );
  };

  if (isLoading) {
    return <div className="loading">Loading video...</div>;
  }

  if (videos.length === 0) {
    return <div className="error">No videos available for this course.</div>;
  }

  const currentVideo = videos[currentIndex];

  return (
    <div className={`video-player-container ${isFullscreen ? 'fullscreen' : ''}`} ref={containerRef}>
      {!isFullscreen && (
        <div className="sidebar">
          <h2>Modules</h2>
          <ul className="module-list">
            {videos.map((video, index) => (
              <li
                key={video.id || index}
                className={`module-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleModuleClick(index)}
              >
                <span className="module-number">{index + 1}</span>
                <span className="module-title">{video.title || 'Untitled Video'}</span>
                {index === currentIndex && (
                  <span className="module-progress">
                    {Math.round((currentTime / duration) * 100)}%
                  </span>
                )}
              </li>
            ))}
          </ul>
          {submodules.length > 0 && (
            <div className="submodules">
              <h3>Submodules</h3>
              <ul className="submodule-list">
                {submodules.map((submodule, index) => (
                  <li
                    key={index}
                    className={`submodule-item ${index === currentSubmodule ? 'active' : ''}`}
                    onClick={() => handleSubmoduleClick(index)}
                  >
                    <span className="submodule-title">{submodule.title}</span>
                    <span className="submodule-time">
                      {formatTime(submodule.start)} - {formatTime(submodule.end)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="video-player">
        <AnimatePresence>
          {isChangingVideo && (
            <motion.div
              className="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="loading-spinner"></div>
              <p>Changing video...</p>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderVideoPlayer()}
        </motion.div>
        {error && (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={handleRetry} className="retry-button">Retry</button>
          </div>
        )}
        {!error && (
          <motion.div
            className="video-player__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="video-player__top-controls">
              <button className="control-button" onClick={handleVideoPress}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button className="control-button" onClick={handleVolumeToggle}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button className="control-button" onClick={() => setShowQualityOptions(!showQualityOptions)}>
                <Settings size={20} />
              </button>
              {showQualityOptions && (
                <div className="quality-options">
                  <button onClick={() => handleQualityChange('auto')}>Auto</button>
                  <button onClick={() => handleQualityChange('high')}>High</button>
                  <button onClick={() => handleQualityChange('medium')}>Medium</button>
                  <button onClick={() => handleQualityChange('low')}>Low</button>
                </div>
              )}
            </div>
            <div className="video-player__center" onClick={handleVideoPress}>
              {!isPlaying && <Play className="video-player__play-icon" size={48} />}
            </div>
            <div className="video-player__bottom-controls">
              <button className="control-button" onClick={handleBackward}>
                <SkipBack size={20} />
              </button>
              <div 
                className="progress-bar" 
                ref={progressBarRef} 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={handleProgressBarClick}
              >
                <div className="progress-filled" style={{ width: `${progress}%` }} />
                <div className="progress-hover" style={{ width: `${(previewTime / duration) * 100}%` }} />
                {showPreview && (
                  <div className="preview" ref={previewRef}>
                    <canvas ref={thumbnailCanvasRef} />
                    <span>{formatTime(previewTime)}</span>
                  </div>
                )}
              </div>
              <div className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              <button className="control-button" onClick={handleForward}>
                <SkipForward size={20} />
              </button>
              <button className="control-button fullscreen-button" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

