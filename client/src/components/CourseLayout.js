import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CourseLayout.css';

const CourseLayout = ({ title, description, modules, quizLink }) => {
  return (
    <div className="course-detail">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {description}
      </motion.p>
      
      <h2>Course Content</h2>
      <div className="module-list">
        {modules.map((module, index) => (
          <motion.div 
            key={index} 
            className="module-item"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="course-actions">
        <Link to={quizLink} className="btn btn-primary">Take Quiz</Link>
        <Link to="/courses" className="btn btn-secondary">Back to Courses</Link>
      </div>
    </div>
  );
};

export default CourseLayout;

