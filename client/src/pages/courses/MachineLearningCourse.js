import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import styles from './MachineLearningCourse.module.css';

export const machineLearningModules = [
  {
    id: "ml1",
    title: "Introduction to Machine Learning",
    description: "Overview of machine learning concepts",
    videoUrl:
    "https://www.dropbox.com/scl/fi/2azwd0bso7c0ksvx2swxj/1-Introduction-to-Machine-Learning-Definition-Example-_ML_.mp4?rlkey=muq5rl5yvnonasdslzd9q9bd5&st=jx7igz24&dl=1",  },
  {
    id: "ml2",
    title: "Supervised Learning",
    description: "Understanding supervised learning algorithms",
    videoUrl:
      "https://www.dropbox.com/scl/fi/3e6uxui5d725809jq66h3/ML-3_-Supervised-Learning-with-Examples-_-Regression-VS-Classification.mp4?rlkey=bne0xx6bz808hbsbj2l1105fd&st=asz6ju0q&dl=1",
  },
  {
    id: "ml3",
    title: "Unsupervised Learning",
    description: "Exploring unsupervised learning techniques",
    videoUrl:
      "https://www.dropbox.com/scl/fi/weiz2gh4vby4ry2t2ig4j/ML-4-_-Unsupervised-Learning-with-Examples-_-ML-Full-Course.mp4?rlkey=d65p95db3felkdb5km4in7apg&st=3ttlsmn0&dl=1",
  },
  {
    id: "ml4",
    title: "Neural Networks",
    description: "Introduction to neural networks and deep learning",
    videoUrl:
      "https://www.dropbox.com/scl/fi/ltg3shvydynh9c1rl9gsl/23-Introduction-to-Artificial-Neural-Networks-their-Representation-of-Neural-Networks-_ML_.mp4?rlkey=5vdw0z96vueye7gj3uhf199w5&st=zbwgg5og&dl=1",
  },
];

const MachineLearningCourse = () => {
  const navigate = useNavigate();

  const handleWatchVideo = (moduleId) => {
    const selectedModule = machineLearningModules.find(
      (module) => module.id === moduleId
    );

    if (selectedModule) {
      navigate(`/courses/machine-learning/video/${moduleId}`, {
        state: { videoUrl: selectedModule.videoUrl },
      });
    }
  };

  return (
    <div className={styles.courseDetail}>
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Machine Learning Fundamentals
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Get started with machine learning concepts and techniques.
      </motion.p>

      <motion.div 
        className={styles.courseInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>
          <strong>BEGINNER:</strong> Advanced
        </p>
        <p>
          <strong>Category:</strong> Machine Learning
        </p>
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
        {machineLearningModules.map((module, index) => (
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

        <Link to="/courses" className={`${styles.btn} ${styles.btnTertiary}`}>
          Back to Courses
        </Link>
      </motion.div>
    </div>
  );
};

export default MachineLearningCourse;

