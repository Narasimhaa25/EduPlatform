import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../config/api"
import "./Auth.css"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const mode = params.get("mode")
    setIsLogin(mode !== "signup")
  }, [location])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup"
      const payload = isLogin ? { email, password } : { name, email, password }
      const response = await api.post(endpoint, payload)

      if (isLogin) {
        login(response.data.token)
        navigate("/")
      } else {
        setIsLogin(true)
        setError("Signup successful! Please log in.")
      }
    } catch (err) {
      console.error("Auth error:", err)
      if (err.response) {
        console.error("Error data:", err.response.data)
        console.error("Error status:", err.response.status)
        console.error("Error headers:", err.response.headers)

        setError(err.response.data.error || "An unexpected error occurred.")
      } else if (err.request) {
        console.error("Error request:", err.request)
        setError("No response from server. Please check your internet connection.")
      } else {
        console.error("Error message:", err.message)
        setError("An error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setError("")
    setName("")
    setEmail("")
    setPassword("")
    navigate(`/auth?mode=${isLogin ? "signup" : "login"}`)
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>
        <p className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={toggleAuthMode}>{isLogin ? "Sign Up" : "Log In"}</button>
        </p>
      </div>
    </div>
  )
}

export default AuthPage

