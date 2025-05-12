import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import api from "../config/api"
import "./Courses.css"

const categories = [
  {
    title: "Microsoft Excel", 
    icon:"/img/cat1.png",
    link: "/courses/excel",
  },
  {
    title: "AWS",
    icon: "/img/cat2.png",
    link: "/courses/aws",
  },
  {
    title: "Python",
    icon: "/img/cat3.png",
    link: "/courses/python",
  },
  {
    title: "Java",
    icon: "/img/cat4.png"
  },
  {
    title: "Web Design",
    icon: "/img/cat5.png",
    link: "/courses/web-design",
  },
  {
    title: "Web Development",
    icon: "/img/cat6.png",
    link: "/courses/web-development",
  },
  {
    title: "MySQL",
    icon: "/img/cat7.png",
    link: "/courses/mysql",
  },
  {
    title: "UI/UX Design",
    icon: "/img/cat8.png",
    link: "/courses/ui-ux",
  },
]

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses")
        setCourses(response.data)
        setFilteredCourses(response.data)
      } catch (error) {
        console.error("Error fetching courses:", error.response?.data || error.message)
        if (error.response && error.response.status === 401) {
          setError("Your session has expired. Please log in again.")
          logout()
          navigate("/auth?mode=login")
        } else {
          setError("Failed to fetch courses. Please try again later.")
        }
      }
    }
    fetchCourses()
  }, [logout, navigate])

  useEffect(() => {
    const results = courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredCourses(results)
  }, [searchTerm, courses])

  const getCourseLink = (course) => {
    switch (course.title) {
      case "Machine Learning Fundamentals":
        return "/courses/machine-learning"
      case "Python for Data Science":
        return "/courses/python-data-science"
      case "Introduction to React":
        return "/courses/react"
      case "Web Development Course":
        return "/courses/web-development"
      default:
        return `/courses/${course._id}`
    }
  }

  const getCourseImage = (courseTitle) => {
    switch (courseTitle) {
      case "Machine Learning Fundamentals":
        return "/machine-learning.jpg"
      case "Python for Data Science":
        return "/Python-Data-Science-Tutorial.jpg"
      case "Introduction to React":
        return "/React.png"
      default:
        return "/placeholder.svg?height=200&width=300"
    }
  }

  const handleEnroll = async (courseId) => {
    if (!user) {
      navigate("/auth?mode=login")
      return
    }

    try {
      await api.post(`/courses/enroll/${courseId}`)
      const enrolledCourse = courses.find((course) => course._id === courseId)
      const updatedCourses = courses.map((course) =>
        course._id === courseId ? { ...course, isEnrolled: true } : course,
      )
      setCourses(updatedCourses)
      setFilteredCourses(updatedCourses)
      navigate(getCourseLink(enrolledCourse))
    } catch (error) {
      console.error("Error enrolling in course:", error)
      setError("Failed to enroll in the course. Please try again.")
    }
  }

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="courses-page">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Our Courses
      </motion.h1>

      {error && <p className="error-message">{error}</p>}

      <div className="search-filter-container">
        <motion.input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>

      <AnimatePresence>
        <motion.div
          className="courses-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course._id}
              className="course-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={getCourseImage(course.title) || "/placeholder.svg"}
                alt={course.title}
                className="course-image"
              />
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <span className={`course-difficulty ${getDifficultyClass(course.difficulty)}`}>
                  {course.difficulty}
                </span>
                <p className="course-description">{course.description}</p>
                <div className="button-container">
                  {course.isEnrolled ? (
                    <Link to={getCourseLink(course)} className="btn btn-primary">
                      Continue Learning
                    </Link>
                  ) : (
                    <button onClick={() => handleEnroll(course._id)} className="btn btn-primary">
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      {filteredCourses.length === 0 && !error && (
        <motion.p
          className="no-courses"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No courses found. Try adjusting your search.
        </motion.p>
      )}

      <section className="categories-section py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-gray-600 uppercase tracking-wider mb-2">CATEGORIES</h6>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-12 bg-orange-400"></div>
              <h2 className="text-4xl font-bold text-orange-400">Popular Topics to Explore</h2>
              <div className="h-px w-12 bg-orange-400"></div>
            </div>
          </div>
          <motion.div className="categories-grid" variants={containerVariants} initial="hidden" animate="visible">
            {categories.map((category, index) => (
              <motion.div key={index} variants={itemVariants} className="category-card">
                <Link to={category.link} className="category-link">
                  <div className="category-content">
                    <div className="category-icon">
                      <img src={category.icon || "/placeholder.svg"} alt={category.title} className="category-image" />
                    </div>
                    <h3 className="category-title">{category.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Courses

