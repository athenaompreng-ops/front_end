import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Upload, ShieldCheck, CreditCard, Image as ImageIcon } from 'lucide-react'
import './App.css'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ email: string } | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('athena_user')
    if (!savedUser) {
      navigate('/login')
    } else {
      setUser(JSON.parse(savedUser))
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('athena_user')
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="dashboard">
      {/* Sidebar / Topnav */}
      <header className="dash-header">
        <div className="dash-header__inner">
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-mark">A</span>
            <span className="navbar__logo-text">ATHENA</span>
          </Link>
          <div className="dash-header__actions">
            <span className="dash-header__user">{user.email}</span>
            <button onClick={handleLogout} className="dash-header__logout">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dash-main">
        <motion.div 
          className="dash-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="dash-header-section">
            <h1 className="dash-title">Welcome back,</h1>
            <p className="dash-subtitle">Manage your protected assets and shield credits.</p>
          </div>

          <div className="dash-stats">
            <div className="dash-stat-card">
              <div className="dash-stat-icon"><ImageIcon size={20} /></div>
              <div className="dash-stat-info">
                <span className="dash-stat-value">12</span>
                <span className="dash-stat-label">Protected Images</span>
              </div>
            </div>
            <div className="dash-stat-card">
              <div className="dash-stat-icon"><ShieldCheck size={20} /></div>
              <div className="dash-stat-info">
                <span className="dash-stat-value">Level 2</span>
                <span className="dash-stat-label">Protection Tier</span>
              </div>
            </div>
            <div className="dash-stat-card">
              <div className="dash-stat-icon"><CreditCard size={20} /></div>
              <div className="dash-stat-info">
                <span className="dash-stat-value">850</span>
                <span className="dash-stat-label">Shield Credits</span>
              </div>
            </div>
          </div>

          <div className="dash-upload-zone">
            <Upload size={32} className="dash-upload-icon" />
            <h3 className="dash-upload-title">Protect a new image</h3>
            <p className="dash-upload-desc">Drag and drop or click to browse</p>
            <button className="btn btn--primary" style={{ marginTop: '16px' }}>Select File</button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
