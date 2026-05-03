import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './LoginPage.css'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('athena_user', JSON.stringify({ email }))
      setLoading(false)
      window.location.href = '/dashboard'
    }, 800)
  }

  return (
    <div className="auth-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-container"
      >
        {/* Logo */}
        <Link to="/" className="auth-logo">
          <span className="auth-logo-icon">A</span>
          <span className="auth-logo-text">ATHENA</span>
        </Link>

        {/* Auth Card */}
        <div className="auth-card">
          <h2 className="auth-title">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="auth-subtitle">
            {isSignUp
              ? 'Start protecting your visual identity today.'
              : 'Sign in to continue protecting your work.'}
          </p>

          {/* Social Login */}
          <div className="auth-social">
            <button className="auth-social-btn" onClick={handleSubmit} type="button">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>

            <button className="auth-social-btn" onClick={handleSubmit} type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X
            </button>

            <button className="auth-social-btn" onClick={handleSubmit} type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <div className="auth-toggle">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="auth-footer">
          By continuing, you agree to ATHENA's{' '}
          <a href="#">Terms of Service</a> and{' '}
          <a href="#">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  )
}
