import React from 'react';
import { useParams, Link } from 'react-router-dom';

const courseData = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build your first website.',
    image: '/web-development-image.avif',
    duration: '6 weeks',
    difficulty: 'Beginner',
    modules: [
      { id: 'wd1', title: 'HTML Fundamentals' },
      { id: 'wd2', title: 'CSS Styling' },
      { id: 'wd3', title: 'JavaScript Basics' },
    ]
  },
  {
    id: 2,
    title: 'Java Programming Language',
    description: 'Master the Java programming language and object-oriented programming concepts.',
    image: '/java.webp',
    duration: '8 weeks',
    difficulty: 'Intermediate',
    modules: [
      { id: 'java1', title: 'Java Syntax and Variables' },
      { id: 'java2', title: 'Object-Oriented Programming in Java' },
      { id: 'java3', title: 'Java Collections and Generics' },
    ]
  },
  {
    id: 3,
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps using React Native and JavaScript.',
    image: '/Mobile-app-development-with-react-native.webp',
    duration: '10 weeks',
    difficulty: 'Advanced',
    modules: [
      { id: 'rn1', title: 'React Native Basics' },
      { id: 'rn2', title: 'Navigation and State Management' },
      { id: 'rn3', title: 'Native Modules and APIs' },
    ]
  },
];

const CourseDetail = () => {
  const { id } = useParams();
  const course = courseData.find(c => c.id === parseInt(id));

  if (!course) {
    return <div className="error">Course not found</div>;
  }

  return (
    <div className="course-detail">
      <h1>{course.title}</h1>
      <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
      <p>{course.description}</p>
      <div className="course-info">
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Difficulty:</strong> {course.difficulty}</p>
      </div>
      <h2>Modules</h2>
      <ul className="module-list">
        {course.modules.map((module) => (
          <li key={module.id}>{module.title}</li>
        ))}
      </ul>
      <div className="course-actions">
        <Link to={`/courses/${course.id}/video/${course.modules[0].id}`} className="btn btn-primary">
          Start Course
        </Link>
        <Link to="/courses" className="btn btn-secondary">
          Back to Courses
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;

