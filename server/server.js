import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import { Dropbox } from 'dropbox';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import Course from './models/Course.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Setup Dropbox
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploads

// Dropbox Upload Endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const fileContent = fs.readFileSync(req.file.path);
    const fileName = req.file.originalname;

    const response = await dbx.filesUpload({
      path: `/${fileName}`,
      contents: fileContent,
      mode: 'add',
    });

    fs.unlinkSync(req.file.path); // Remove file from the server
    res.json({ message: 'File uploaded successfully', file: response });
  } catch (error) {
    console.error('Error uploading to Dropbox:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');

    // Check if there are any courses in the database
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      const sampleCourses = [
        {
          title: 'Introduction to React',
          description: 'Learn the basics of React',
          category: 'Web Development',
          duration: 10,
          difficulty: 'Beginner',
          rating: 4.5,
          modules: [
            { title: 'React Basics', content: 'Introduction to React concepts' },
            { title: 'Components', content: 'Understanding React components' }
          ]
        },
        {
          title: 'Python for Data Science',
          description: 'Master Python for data analysis',
          category: 'Data Science',
          duration: 15,
          difficulty: 'Intermediate',
          rating: 4.7,
          modules: [
            { title: 'Python Basics', content: 'Introduction to Python' },
            { title: 'Data Analysis', content: 'Using Python for data analysis' }
          ]
        }
      ];
      await Course.insertMany(sampleCourses);
      console.log('Sample courses created successfully');
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    details: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));