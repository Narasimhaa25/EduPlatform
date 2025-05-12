import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./ShortVideoPlayer.css"

const ShortVideoPlayer = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [videos, setVideos] = useState([])
  const directionRef = useRef('up')
  const videoRef = useRef(null)

  useEffect(() => {
    const dummyVideos = [
      { 
        id: 1, 
        url: "https://www.dropbox.com/scl/fi/c764urlfqc5dcfev7bg1e/videoplayback-1.mp4?rlkey=s5jvub711kpr6a7rdrl4yufgk&st=4984yks6&dl=1",
        title: "ML ROADMAP"
      },
      { 
        id: 2, 
        url: "https://www.dropbox.com/scl/fi/yhk85aalom6gz0867iww1/Front-End-Developer-Roadmap-From-Novice-to-Front-End-Expert.mp4?rlkey=z1bcjn3j2ja6j235kovn93a10&st=mgggjlgd&dl=1",
        title: "FRONT END"
      },
      { 
        id: 3, 
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        title: "Mountain View"
      },
    ]
    setVideos(dummyVideos)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }, [currentVideoIndex])

  const handleVideoEnd = () => {
    setCurrentVideoIndex(prev => (prev + 1) % videos.length)
  }

  const handleDragEnd = (_, info) => {
    const dragDistance = info.offset.y
    const dragVelocity = info.velocity.y

    if (dragDistance < -100 || dragVelocity < -500) {
      if (currentVideoIndex < videos.length - 1) {
        directionRef.current = 'up'
        setCurrentVideoIndex(prev => prev + 1)
      }
    } else if (dragDistance > 100 || dragVelocity > 500) {
      if (currentVideoIndex > 0) {
        directionRef.current = 'down'
        setCurrentVideoIndex(prev => prev - 1)
      }
    }
  }

  return (
    <div className="reels-container">
      <AnimatePresence initial={false} mode='wait'>
        <motion.div
          key={currentVideoIndex}
          className="video-card"
          initial={{ 
            y: directionRef.current === 'up' ? '100vh' : '-100vh',
            opacity: 0
          }}
          animate={{ 
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
          exit={{ 
            y: directionRef.current === 'up' ? '-100vh' : '100vh',
            opacity: 0,
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {videos[currentVideoIndex] && (
            <>
              <div className="video-wrapper">
                <video 
                  ref={videoRef}
                  src={videos[currentVideoIndex].url} 
                  autoPlay 
                  muted 
                  playsInline 
                  onEnded={handleVideoEnd}
                  className="video-content"
                />
              </div>
              <div className="title-overlay">
                <h3 className="video-title">{videos[currentVideoIndex].title}</h3>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default ShortVideoPlayer