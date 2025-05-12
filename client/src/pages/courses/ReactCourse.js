import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ReactCourse.module.css';

export const reactModules = [
  {
    id: 'react1',
    title: "React Fundamentals",
    description: "Understanding React components and JSX",
    videoUrl: "https://www.dropbox.com/scl/fi/b5rqbzq1vz9nucn6t1pl4/videoplayback.mp4?rlkey=vjjbhqi694zm5700rwqf2kkv4&st=6k9tlf3s&dl=1"
  },
  {
    id: 'react2',
    title: "Hooks",
    description: "Using React Hooks for state and side effects",
    videoUrl: "https://www.dropbox.com/scl/fi/c764urlfqc5dcfev7bg1e/videoplayback-1.mp4?rlkey=s5jvub711kpr6a7rdrl4yufgk&st=w5r2qzoo&dl=1"
  },
  {
    id: 'react3',
    title: "Routing",
    description: "Implementing navigation with React Router",
    videoUrl: "https://www.dropbox.com/scl/fi/leqwpo7vea30nreb8v6yr/React-Router-Tutorial-6-Navigating-Programmatically.mp4?rlkey=l1t4kr6z2yhbvjoz74e04u74r&st=yxnm96it&dl=1"
  },
  {
    id: 'react4',
    title: "Performance Optimization",
    description: "Optimizing React applications for better performance",
    videoUrl: "https://www.dropbox.com/scl/fi/502km8yugusqm9gq0dv0o/8-React-Js-performance-optimization-techniques-YOU-HAVE-TO-KNOW.mp4?rlkey=bmd1z9mqnwlxef51dw97eec46&st=niivytmb&dl=1"
}
];

const ReactCourse = () => {
  const navigate = useNavigate();

  const handleWatchVideo = (videoId) => {
    navigate(`/courses/react/video/${videoId}`);
  };

  return (
    <div className={styles.courseDetail}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Introduction to React
      </motion.h1>
      <motion.div
        className={styles.courseImageContainer}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Learn the basics of React and build modern web applications.
      </motion.p>
      
      <motion.div 
        className={styles.courseInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p><strong>Duration:</strong> 10 hours</p>
        <p><strong>Difficulty:</strong> Beginner</p>
        <p><strong>Category:</strong> Web Development</p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Course Modules
      </motion.h2>
      <motion.div
        className={styles.moduleList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {reactModules.map((module, index) => (
          <motion.div
            key={module.id}
            className={styles.moduleItem}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => handleWatchVideo(module.id)}
            >
              Watch Video
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className={styles.courseActions}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Link to="/courses" className={`${styles.btn} ${styles.btnTertiary}`}>Back to Courses</Link>
      </motion.div>
    </div>
  );
};

export default ReactCourse;

