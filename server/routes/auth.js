import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" })
    }
    const user = new User({ email, password, name })
    await user.save()
    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    console.error("Signup error:", error)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Duplicate key error. Please try again." })
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Validation error", details: error.message })
    }
    res.status(500).json({
      error: "Error creating user",
      details: error.message,
    })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }
    console.log("Login attempt for email:", email)

    const user = await User.findOne({ email })
    if (!user) {
      console.log("User not found for email:", email)
      return res.status(400).json({ error: "Invalid credentials" })
    }

    console.log("User found, comparing password")
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      console.log("Invalid password for email:", email)
      return res.status(400).json({ error: "Invalid credentials" })
    }

    console.log("Password matched, generating token")
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error("JWT_SECRET is not set in environment variables")
      return res.status(500).json({ error: "Internal server error" })
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" })
    console.log("Login successful for email:", email)
    res.json({ token, userId: user._id })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Error logging in", details: error.message })
  }
})

router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ error: "No token provided" })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).populate("enrolledCourses.course")
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json({
      email: user.email,
      enrolledCourses: user.enrolledCourses.map((course) => ({
        course: course.course,
        progress: course.progress,
      })),
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" })
    }
    res.status(500).json({ error: "Error fetching profile", details: error.message })
  }
})

export default router

