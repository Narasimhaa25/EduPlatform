import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./JavaProgrammingCourse.module.css"

export const javaProgrammingModules = [
  {
    id: "java1",
    title: "Java Basics",
    description: "Introduction to Java syntax and basic concepts",
    videoUrl: "",
  },
  {
    id: "java2",
    title: "Object-Oriented Programming in Java",
    description: "Learn about classes, objects, inheritance, and polymorphism",
    videoUrl: "",
  },
  {
    id: "java3",
    title: "Java Collections Framework",
    description: "Working with Lists, Sets, and Maps in Java",
    videoUrl: "",
  },
  {
    id: "java4",
    title: "Java Concurrency and Multithreading",
    description: "Understanding threads and concurrent programming in Java",
    videoUrl: "",
  },
]

const JavaProgrammingCourse = () => {
  const navigate = useNavigate()

  const handleWatchVideo = (videoId) => {
    navigate(`/courses/java-programming/video/${videoId}`)
  }

  return (
    <div className={styles.courseDetail}>
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Java Programming Language
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
        Master the fundamentals of Java programming and build robust applications.
      </motion.p>

      <motion.div
        className={styles.courseInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>
          <strong>Duration:</strong> 20 hours
        </p>
        <p>
          <strong>Difficulty:</strong> Intermediate
        </p>
        <p>
          <strong>Category:</strong> Programming Languages
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
        {javaProgrammingModules.map((module, index) => (
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

export default JavaProgrammingCourse

