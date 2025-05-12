import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-between items-center">
          <li>
            <Link to="/" className="text-xl font-bold">
              Simple Education
            </Link>
          </li>
          <li>
            <Link to="/courses" className="hover:text-secondary-foreground">
              Courses
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile" className="hover:text-secondary-foreground">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logout} className="hover:text-secondary-foreground">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth" className="hover:text-secondary-foreground">
                Login / Sign Up
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header

