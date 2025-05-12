import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

const updateCourses = async () => {
  try {
    const courses = await Course.find();
    console.log('Total courses found:', courses.length);

    for (let course of courses) {
      if (!course.courseNumber) {
        course.courseNumber = Math.floor(Math.random() * 1000) + 1; // Generate a random course number
        await course.save();
        console.log(`Updated course ${course._id} with courseNumber ${course.courseNumber}`);
      } else {
        console.log(`Course ${course._id} already has courseNumber ${course.courseNumber}`);
      }
    }

    console.log('All courses updated successfully');
  } catch (error) {
    console.error('Error updating courses:', error);
  } finally {
    mongoose.connection.close();
  }
};

updateCourses();

