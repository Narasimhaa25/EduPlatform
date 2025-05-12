import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaStar, FaUserGraduate, FaUser, FaClock } from "react-icons/fa"
import "./Home.css"

const Home = () => {
  const featuredCourses = [
    {
      id: "web-development",
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript",
      image: "/web-development-image.avif",
    },
    {
      id: "java-programming",
      title: "Java Programming Language",
      description: "Master the fundamentals of Java programming",
      image: "/java.webp",
    },
    {
      id: "react-native",
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile apps with React Native",
      image: "/Mobile-app-development-with-react-native.webp",
    },
  ]

  const categories = [
    {
      title: "Microsoft Excel",
      icon: "/img/cat1.png",
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
      icon: "/img/cat4.png",
      link: "/courses/java",
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

  const courses = [
    {
      id: 1,
      title: "HTML Course for Beginners",
      image: "img/course-1.jpg",
      rating: 4.55,
      learners: "5.8L+",
      difficulty: "Beginner",
      duration: "2.0 Hrs",
      
    },
    {
      id: 2,
      title: "Front End Development-CSS",
      image: "img/course-2.jpg",
      rating: 4.55,
      learners: "5.2L+",
      difficulty: "Beginner",
      duration: "4.0 Hrs",
   
    },
    {
      id: 3,
      title: "Introduction to JavaScript",
      image: "img/course-3.jpg",
      rating: 4.46,
      learners: "76L+",
      difficulty: "Beginner",
      duration: "2.5 Hrs",
      
    },
    {
      id: 4,
      title: "Python Programming",
      image: "img/course-4.jpg",
      rating: 3.54,
      learners: "3.3L+",
      difficulty: "Beginner",
      duration: "3.0 Hrs",
    
    },
    {
      id: 5,
      title: "SQL for Data Science",
      image: "img/course-5.jpg",
      rating: 4.54,
      learners: "1.3L+",
      difficulty: "Intermediate",
      duration: "5.0 Hrs",
      
    },
    {
      id: 6,
      title: "ChatGPT for Beginners",
      image: "img/course-6.jpg",
      rating: 3.55,
      learners: "3.5L+",
      difficulty: "Beginner",
      duration: "4.5 Hrs",
 
    },
    {
      id: 7,
      title: "AWS for Beginners",
      image: "img/course-7.jpg",
      rating: 4.53,
      learners: "1L+",
      difficulty: "Beginner",
      duration: "3.0 Hrs",

    },
    {
      id: 8,
      title: "Microsoft Azure Essentials",
      image: "img/course-8.jpg",
      rating: 4.64,
      learners: "4.4L+",
      difficulty: "Intermediate",
      duration: "3.5 Hrs",
  
    },
    {
      id: 9,
      title: "Introduction to MS Excel",
      image: "img/course-9.jpg",
      rating: 4.6,
      learners: "4.2L+",
      difficulty: "Beginner",
      duration: "3.5 Hrs",
    },
    {
      id: 10,
      title: "Statistics For Data Science",
      image: "img/course-10.jpg",
      rating: 4.55,
      learners: "5.3L+",
      difficulty: "Intermediate",
      duration: "2.5 Hrs",
  
    },
    {
      id: 11,
      title: "Java Programming",
      image: "img/course-11.jpg",
      rating: 4.45,
      learners: "5L+",
      difficulty: "Beginner",
      duration: "2.0 Hrs",

    },
    {
      id: 12,
      title: "C for Beginners",
      image: "img/course-12.png",
      rating: 4.5,
      learners: "1.1L+",
      difficulty: "Beginner",
      duration: "1.5 Hrs",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>Welcome to Simple Education Learning Platform</h1>
          <p>
            Discover a world of knowledge at your fingertips. Learn, grow, and achieve your goals with our interactive
            courses.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/courses" className="btn">
              Explore Courses
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Courses Section */}
      <section className="featured-courses">
        <h2>Featured Courses</h2>
        <motion.div className="course-grid" variants={containerVariants} initial="hidden" animate="visible">
          {featuredCourses.map((course) => (
            <motion.div
              key={course.id}
              className="course-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={course.image || "/placeholder.svg?height=200&width=300"} alt={course.title} />
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
              <motion.div className="course-action" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={`/courses/${course.id}`} className="btn">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Platform Features Section */}
      <section className="platform-features">
        <h2>Why Choose Our Platform?</h2>
        <motion.div className="features-grid" variants={containerVariants} initial="hidden" animate="visible">
          {[
            {
              icon: "🎥",
              title: "Engaging Video Content",
              description: "Learn with short, easy-to-digest video lessons",
            },
            {
              icon: "📊",
              title: "Progress Tracking",
              description: "Monitor your learning journey with detailed progress reports",
            },
            { icon: "🧠", title: "Interactive Quizzes", description: "Test your knowledge with our adaptive quizzes" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Categories Section */}
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

      {/* All Courses Section */}
      <section className="all-courses-section py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-gray-600 uppercase tracking-wider mb-2">ALL COURSES</h6>
            <h2 className="text-4xl font-bold text-orange-400 mb-4">Explore Our Course Catalog</h2>
          </div>
          <motion.div className="courses-grid" variants={containerVariants} initial="hidden" animate="visible">
            {courses.map((course) => (
              <motion.div key={course.id} className="course-card" variants={itemVariants}>
                <div className="course-image-container">
                  <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                </div>
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <div className="course-info">
                    <span>
                      <FaStar className="icon text-yellow-400" /> {course.rating}
                    </span>
                    <span>
                      <FaUserGraduate className="icon" /> {course.learners} Learners
                    </span>
                    <span>
                      <FaUser className="icon" /> {course.difficulty}
                    </span>
                  </div>
                  <div className="course-footer">
                    <span>
                      <FaClock className="icon" /> {course.duration}
                    </span>
                    <Link to={`/courses/${course.id}`} className="enroll-button">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

