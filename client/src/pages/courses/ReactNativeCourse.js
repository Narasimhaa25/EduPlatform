import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./ReactNativeCourse.module.css"

export const reactNativeModules = [
  {
    id: "rn1",
    title: "Introduction to React Native",
    description: "Overview of React Native and its core concepts",
    videoUrl: "",
  },
  {
    id: "rn2",
    title: "React Native Components and Styling",
    description: "Building UI with React Native components and styling techniques",
    videoUrl: "",
  },
  {
    id: "rn3",
    title: "Navigation in React Native",
    description: "Implementing navigation and routing in React Native apps",
    videoUrl: "",
  },
  {
    id: "rn4",
    title: "State Management and API Integration",
    description: "Managing app state and integrating with backend APIs",
    videoUrl: "",
  },
]

const ReactNativeCourse = () => {
  const navigate = useNavigate()

  const handleWatchVideo = (videoId) => {
    navigate(`/courses/react-native/video/${videoId}`)
  }

  return (
    <div className={styles.courseDetail}>
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Mobile App Development with React Native
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
        Learn to build cross-platform mobile apps using React Native.
      </motion.p>

      <motion.div
        className={styles.courseInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>
          <strong>Duration:</strong> 25 hours
        </p>
        <p>
          <strong>Difficulty:</strong> Intermediate
        </p>
        <p>
          <strong>Category:</strong> Mobile Development
        </p>
      </motion.div>

      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
        Course Modules
      </motion.h2>
      <motion.div
        className={styles.moduleList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {reactNativeModules.map((module, index) => (
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
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => handleWatchVideo(module.id)}>
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
  )
}

export default ReactNativeCourse

