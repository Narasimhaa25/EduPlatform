import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PythonDataScienceCourse.module.css';

export const pythonDataScienceModules = [
  {
    id: 'pds1',
    title: "Python Basics",
    description: "Introduction to Python programming",
    videoUrl: "https://www.dropbox.com/scl/fi/aq925p8ec9jpszx5ty7d6/Introduction-To-Python-1-_-Python-For-Beginners-_-Python-Tutorial-_-Python-Basics-_-Simplilearn.mp4?rlkey=r8m20e9tphbpwfk8xjvivubj6&st=b0zmdfpw&dl=1"
  },
  {
    id: 'pds2',
    title: "Data Manipulation with Pandas",
    description: "Working with Pandas for data analysis",
    videoUrl: ""
  },
  {
    id: 'pds3',
    title: "Data Visualization",
    description: "Creating visualizations with Matplotlib and Seaborn",
    videoUrl: "https://www.dropbox.com/scl/fi/iywn58czo2psyx3p9mqn8/Data-Visualization-_-Data-Visualization-Python-_-Intellipaat.mp4?rlkey=6zemis8phd0rds3cnxojzp7y3&st=jpmo3g66&dl=1"
  },
  {
    id: 'pds4',
    title: "Introduction to Machine Learning",
    description: "Basic machine learning concepts with Scikit-learn",
    videoUrl: "https://www.dropbox.com/scl/fi/2azwd0bso7c0ksvx2swxj/1-Introduction-to-Machine-Learning-Definition-Example-_ML_.mp4?rlkey=muq5rl5yvnonasdslzd9q9bd5&st=jx7igz24&dl=1"
  },
];

const PythonDataScienceCourse = () => {
  const navigate = useNavigate();

  const handleWatchVideo = (videoId) => {
    navigate(`/courses/python-data-science/video/${videoId}`);
  };

  return (
    <div className={styles.courseDetail}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Python for Data Science
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
        Master Python for data analysis, visualization, and machine learning.
      </motion.p>
      
      <motion.div 
        className={styles.courseInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p><strong>Duration:</strong> 15 hours</p>
        <p><strong>Difficulty:</strong> Intermediate</p>
        <p><strong>Category:</strong> Data Science</p>
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
        {pythonDataScienceModules.map((module, index) => (
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

export default PythonDataScienceCourse;

