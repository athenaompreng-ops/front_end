import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setHidden(y > 300 && y > lastY)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: 0, x: '-50%' }}
        animate={{ y: hidden ? -100 : 0, x: '-50%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="nav__inner">
          <Link to="/" className="nav__logo">
            <span className="nav__logo-icon">A</span>
            <span className="nav__logo-text">ATHENA</span>
          </Link>

          <ul className="nav__links">
            <li><a href="#shield">Shield</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#tech">Technology</a></li>
            <li><a href="#stats">Impact</a></li>
          </ul>

          <div className="nav__actions">
            <Link to="/login" className="nav__cta">
              Get Started
            </Link>
          </div>

          <button
            className="nav__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav__mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="nav__mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#shield" onClick={() => setMobileOpen(false)}>Shield</a>
              <a href="#how" onClick={() => setMobileOpen(false)}>How It Works</a>
              <a href="#tech" onClick={() => setMobileOpen(false)}>Technology</a>
              <a href="#stats" onClick={() => setMobileOpen(false)}>Impact</a>
              <Link to="/login" className="nav__mobile-cta" onClick={() => setMobileOpen(false)}>
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
