import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import { FaHome, FaBook, FaUser, FaVideo } from "react-icons/fa";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <span className="logo-text">SimpleEdu</span>
        </Link>
        <Link to="/e-reels" className="nav-link">
          <FaVideo /> E-REELS
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            
            <Link 
              to={user ? "/courses" : "/auth?mode=login"}
              className="nav-link"
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  navigate('/auth?mode=login', { state: { message: 'Please log in to view all courses' } });
                }
              }}
            >
              Courses
            </Link>

            <Link to="/quizzes" className="nav-link">Quizzes</Link>
            
            {user ? (
              <>
                <Link to="/profile" className="nav-link">Profile</Link>
                <button onClick={logout} className="nav-link btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/auth?mode=login" className="btn btn-secondary">Log in</Link>
                <Link to="/auth?mode=signup" className="btn btn-primary">Sign up</Link>
              </div>
            )}
          </div>
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Header;

