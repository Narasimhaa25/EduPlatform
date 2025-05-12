import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const ProgressDashboard = ({ enrolledCourses }) => {
  const chartData = enrolledCourses
    .filter((course) => course.isEnrolled)
    .map((course) => ({
      name: course.title,
      progress: course.overallProgress,
    }))

  return (
    <motion.div
      className="progress-dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Your Learning Progress</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No enrolled courses yet. Enroll in a course to see your progress!</p>
      )}
      <div className="course-progress-list">
        {enrolledCourses.map((course) => (
          <Link to={`/courses/${course._id}`} key={course._id} className="course-progress-item">
            <h3>{course.title}</h3>
            <div className="progress-bar">
              <div className="progress-filled" style={{ width: `${course.overallProgress}%` }}></div>
            </div>
            <span>{course.overallProgress}% Complete</span>
            {!course.isEnrolled && <span className="not-enrolled">Not Enrolled</span>}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

export default ProgressDashboard

