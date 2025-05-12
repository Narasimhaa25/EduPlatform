import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Courses from "./pages/Courses"
import CourseDetail from "./pages/CourseDetail"
import PythonDataScienceCourse from "./pages/courses/PythonDataScienceCourse"
import MachineLearningCourse from "./pages/courses/MachineLearningCourse"
import ReactCourse from "./pages/courses/ReactCourse"
import WebDevelopmentCourse from "./pages/courses/WebDevelopmentCourse"
import JavaProgrammingCourse from "./pages/courses/JavaProgrammingCourse"
import ReactNativeCourse from "./pages/courses/ReactNativeCourse"
import Quiz from "./pages/Quiz"
import AuthPage from "./pages/AuthPage"
import Profile from "./pages/Profile"
import VideoPlayer from "./components/VideoPlayer"
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import Quizzes from "./pages/Quizzes"
import "./App.css"
import ShortVideoPlayer from "./components/ShortVideoPlayer"

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/courses/web-development" element={<WebDevelopmentCourse />} />
                <Route path="/courses/python-data-science" element={<PythonDataScienceCourse />} />
                <Route path="/courses/machine-learning" element={<MachineLearningCourse />} />
                <Route path="/courses/react" element={<ReactCourse />} />
                <Route path="/courses/java-programming" element={<JavaProgrammingCourse />} />
                <Route path="/courses/react-native" element={<ReactNativeCourse />} />
                <Route path="/courses/:courseId/video/:videoId" element={<VideoPlayer />} />
                <Route path="/quiz/:courseId" element={<Quiz />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/e-reels" element={<ShortVideoPlayer />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App

