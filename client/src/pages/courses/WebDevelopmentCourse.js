import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './WebDevelopmentCourse.css';

export const webDevelopmentModules = [
  {
    id: 'wd1',
    title: 'HTML5 and CSS3 Fundamentals',
    description: 'Learn the basics of web structure and styling',
    videoUrl: 'https://www.dropbox.com/scl/fi/2azwd0bso7c0ksvx2swxj/1-Introduction-to-Machine-Learning-Definition-Example-_ML_.mp4?rlkey=muq5rl5yvnonasdslzd9q9bd5&st=tlhcugx9&dl=1',
  },
  {
    id: 'wd2',
    title: 'JavaScript Essentials',
    description: 'Master the core concepts of JavaScript programming',
    videoUrl: 'https://www.dropbox.com/scl/fi/2azwd0bso7c0ksvx2swxj/1-Introduction-to-Machine-Learning-Definition-Example-_ML_.mp4?rlkey=muq5rl5yvnonasdslzd9q9bd5&st=jx7igz24&dl=1',
  },
  {
    id: 'wd3',
    title: 'Responsive Web Design',
    description: 'Create websites that look great on any device',
    videoUrl: '',
  },
  {
    id: 'wd4',
    title: 'Introduction to React',
    description: 'Build interactive user interfaces with React',
    videoUrl: '',
  },
  {
    id: 'wd5',
    title: 'Backend Development with Node.js',
    description: 'Learn server-side programming with Node.js',
    videoUrl: '',
  },
  {
    id: 'wd6',
    title: 'Database Integration with MongoDB',
    description: 'Connect your web applications to MongoDB databases',
    videoUrl: '',
  },
];

const WebDevelopmentCourse = () => {
  const navigate = useNavigate();
  const backgroundRef = useRef(null);

  useEffect(() => {
    const createFloatingCard = () => {
      const card = document.createElement('div');
      card.className = 'floating-card';
      card.textContent = ['<HTML>', '{CSS}', 'JS();', '<React/>', 'Node.js'][Math.floor(Math.random() * 5)];
      card.style.left = `${Math.random() * 100}%`;
      card.style.top = `${Math.random() * 100}%`;
      backgroundRef.current.appendChild(card);

      setTimeout(() => {
        card.style.transform = `translate(${Math.random() * 100 - 50}%, ${Math.random() * 100 - 50}%) rotate(${Math.random() * 360}deg)`;
      }, 100);

      setTimeout(() => {
        card.remove();
      }, 5000);
    };

    const interval = setInterval(createFloatingCard, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleWatchVideo = (moduleId) => {
    const selectedModule = webDevelopmentModules.find(
      (module) => module.id === moduleId
    );
    if (selectedModule) {
      navigate(`/courses/web-development/video/${moduleId}`, {
        state: { videoUrl: selectedModule.videoUrl },
      });
    }
  };

  return (
    <div className="enhanced-background">
      <div className="background-motion" ref={backgroundRef}></div>

      <motion.div
        className="course-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Web Development Course</h1>
      </motion.div>

      <motion.div
        className="course-image-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/web-development-image.avif"
          alt="Web Development Course"
          className="course-image"
        />
      </motion.div>

      <motion.p
        className="welcome-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Welcome to our comprehensive Web Development course. Here you'll learn
        everything from HTML and CSS to advanced JavaScript and modern frameworks.
      </motion.p>

      <motion.div
        className="course-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p>
          <strong>Duration:</strong> 40 hours
        </p>
        <p>
          <strong>Difficulty:</strong> Beginner to Intermediate
        </p>
        <p>
          <strong>Category:</strong> Web Development
        </p>
      </motion.div>

      <motion.h2
        className="module-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Course Modules
      </motion.h2>

      <motion.div
        className="module-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {webDevelopmentModules.map((module, index) => (
          <motion.div
            key={module.id}
            className="module-item"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
          >
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <button
              className="btn btn-secondary"
              onClick={() => handleWatchVideo(module.id)}
            >
              Watch Video
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="course-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <Link to="/courses" className="btn btn-tertiary">
          Back to Courses
        </Link>
      </motion.div>
    </div>
  );
};

export default WebDevelopmentCourse;

