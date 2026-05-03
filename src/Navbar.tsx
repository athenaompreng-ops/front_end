import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'

const NAV_LINKS = [
  { href: '#shield', label: 'Shield' },
  { href: '#how', label: 'How It Works' },
  { href: '#tech', label: 'Technology' },
  { href: '#stats', label: 'Impact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('athena-theme') !== 'light'
    }
    return true
  })
  const [lastY, setLastY] = useState(0)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Theme effect
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
      localStorage.setItem('athena-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      localStorage.setItem('athena-theme', 'light')
    }
  }, [isDark])

  // Scroll handler
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 400 && y > lastY)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [])

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'navbar--float' : ''}`}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-mark">A</span>
            <span className="navbar__logo-text">ATHENA</span>
          </Link>

          {/* Center nav links */}
          {isHome && (
            <nav className="navbar__center">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} className="navbar__link">
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Right actions */}
          <div className="navbar__right">
            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex' }}
                  >
                    <Sun size={16} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex' }}
                  >
                    <Moon size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link to="/login" className="navbar__cta">
              Get Started
            </Link>

            <button
              className="navbar__burger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              className="navbar__drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <div className="navbar__drawer-header">
                <span className="navbar__logo-mark">A</span>
                <span className="navbar__logo-text">ATHENA</span>
              </div>
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="navbar__drawer-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/login"
                className="navbar__drawer-cta"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
