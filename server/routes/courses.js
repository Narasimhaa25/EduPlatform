import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Course from '../models/Course.js';
import mongoose from 'mongoose';

const router = express.Router();

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Apply authentication middleware to all routes
router.use(authenticateUser);

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    const user = await User.findById(req.userId);
    
    const coursesWithEnrollmentStatus = courses.map(course => ({
      ...course.toObject(),
      isEnrolled: user.enrolledCourses.some(enrolledCourse => 
        enrolledCourse.course.toString() === course._id.toString()
      )
    }));

    res.json(coursesWithEnrollmentStatus);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

// Get a single course by ID or title-based URL
router.get('/:courseIdentifier', async (req, res) => {
  try {
    let course;
    const { courseIdentifier } = req.params;

    // Define mapping for URL-friendly identifiers to course titles
    const urlToTitle = {
      'react': 'Introduction to React',
      'python-data-science': 'Python for Data Science',
      'machine-learning': 'Machine Learning Fundamentals'
    };

    if (mongoose.Types.ObjectId.isValid(courseIdentifier)) {
      course = await Course.findById(courseIdentifier);
    } else if (urlToTitle[courseIdentifier]) {
      course = await Course.findOne({ title: urlToTitle[courseIdentifier] });
    }

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const user = await User.findById(req.userId);
    const isEnrolled = user.enrolledCourses.some(
      enrolledCourse => enrolledCourse.course.toString() === course._id.toString()
    );

    res.json({
      ...course.toObject(),
      isEnrolled
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Error fetching course', details: error.message });
  }
});

// Enroll in a course
router.post('/enroll/:courseId', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (user.enrolledCourses.some(enrollment => enrollment.course.toString() === course._id.toString())) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    const enrolledCourse = {
      course: course._id,
      title: course.title,
      overallProgress: 0
    };

    user.enrolledCourses.push(enrolledCourse);
    await user.save();

    res.json({ message: 'Enrolled successfully', enrolledCourse });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ error: 'Error enrolling in course', details: error.message });
  }
});

// Update course progress
router.put('/:courseId/progress', async (req, res) => {
  try {
    const { progress } = req.body;
    const user = await User.findById(req.userId);
    const courseIndex = user.enrolledCourses.findIndex(
      course => course.course.toString() === req.params.courseId
    );

    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found in enrolled courses' });
    }

    user.enrolledCourses[courseIndex].overallProgress = progress;
    await user.save();

    res.json(user.enrolledCourses[courseIndex]);
  } catch (error) {
    console.error('Error updating course progress:', error);
    res.status(500).json({ error: 'Error updating course progress', details: error.message });
  }
});

export default router;