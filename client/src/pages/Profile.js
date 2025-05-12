import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import api from "../config/api"
import { useAuth } from "../context/AuthContext"
import "./Profile.css"

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", enrolledCourses: [] })
  const [courses, setCourses] = useState([])
  const [activeTab, setActiveTab] = useState("enrolled")
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, coursesResponse] = await Promise.all([api.get("/auth/profile"), api.get("/courses")])

        console.log("Profile data:", profileResponse.data) // Log profile data

        // Initialize random progress for enrolled courses
        const updatedEnrolledCourses = profileResponse.data.enrolledCourses.map((enrollment) => ({
          ...enrollment,
          progress: Math.floor(Math.random() * 101), // Random progress between 0 and 100
        }))

        setProfile({
          ...profileResponse.data,
          enrolledCourses: updatedEnrolledCourses,
        })
        setCourses(coursesResponse.data) // Set available courses
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleEnroll = async (courseId) => {
    try {
      const response = await api.post(`/courses/enroll/${courseId}`)
      setProfile((prevProfile) => ({
        ...prevProfile,
        enrolledCourses: [...prevProfile.enrolledCourses, { course: response.data.course, progress: 0 }],
      }))
    } catch (error) {
      console.error("Error enrolling in course:", error)
    }
  }

  const handleUpdateProgress = async (courseId, progress) => {
    try {
      // Optimistically update the UI
      setProfile((prevProfile) => ({
        ...prevProfile,
        enrolledCourses: prevProfile.enrolledCourses.map((enrollment) =>
          enrollment.course._id === courseId ? { ...enrollment, progress } : enrollment,
        ),
      }))

      // Then send the update to the server
      await api.put(`/courses/progress/${courseId}`, { progress })
    } catch (error) {
      console.error("Error updating progress:", error)
      // If there's an error, you might want to revert the optimistic update
    }
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <p className="loading-text">Loading...</p>
      </div>
    )
  }

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 initial={{ y: -50 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 120 }}>
        Profile
      </motion.h1>

      <div className="profile-info">
        <AnimatePresence mode="wait">
          <p>Email: {profile.email}</p>
        </AnimatePresence>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "enrolled" ? "active" : ""}`}
          onClick={() => setActiveTab("enrolled")}
        >
          Enrolled Courses
        </button>
        <button
          className={`tab-button ${activeTab === "available" ? "active" : ""}`}
          onClick={() => setActiveTab("available")}
        >
          Available Courses
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "enrolled" && (
          <motion.div
            key="enrolled"
            className="enrolled-courses"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <h2>Enrolled Courses</h2>
            {profile.enrolledCourses.map((enrollment) => (
              <motion.div
                key={enrollment.course._id}
                className="course-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3>{enrollment.course.title}</h3>
                <p>Progress: {enrollment.progress}%</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={enrollment.progress}
                  onChange={(e) => handleUpdateProgress(enrollment.course._id, Number.parseInt(e.target.value))}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "available" && (
          <motion.div
            key="available"
            className="available-courses"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <h2>Available Courses</h2>
            {courses
              .filter((course) => !profile.enrolledCourses.some((ec) => ec.course._id === course._id))
              .map((course) => (
                <motion.div
                  key={course._id}
                  className="course-item"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button onClick={() => handleEnroll(course._id)} className="button enroll-button">
                    Enroll
                  </button>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Profile

