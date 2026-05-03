import { useEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight, Shield, ShieldOff, ScanFace, Fingerprint,
  Upload, Cpu, Download,
  Blocks, Zap, Box, FileCode2, Terminal, Database, Cloud, ShieldCheck,
  ChevronDown
} from 'lucide-react'
import StarField from './StarField'
import LightRays from './LightRays'
import Navbar from './Navbar'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const LoginPage = lazy(() => import('./LoginPage'))

/* ============================================
   Scroll-animated wrapper
   ============================================ */
function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ============================================
   Hero Section
   ============================================ */
function HeroSection() {
  return (
    <section className="hero" id="hero">
      {/* Background layers */}
      <div className="hero__bg">
        <StarField />
        <div className="spline-bg-container">
          <iframe 
            src='https://my.spline.design/blackhole-TmXxFv9G3ybkdijw4OSNNCme/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="spline-iframe"
            title="Black Hole Background"
          />
        </div>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.2}
          lightSpread={1.5}
          rayLength={2.5}
          pulsating={true}
          fadeDistance={1.2}
          saturation={0}
          followMouse={true}
          mouseInfluence={0.15}
          style={{ zIndex: 3, mixBlendMode: 'screen', opacity: 0.85 }}
        />
        <div className="hero__vignette" />
      </div>

      {/* Content */}
      <div className="hero__content">
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          ATHENA
        </motion.h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Turn Your Images Invisible — Untrackable, Untrainable, Yours.
        </motion.p>

        <motion.div
          className="hero__search"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <input
            type="text"
            placeholder="Protect your image from AI..."
            className="hero__search-input"
            readOnly
          />
          <button className="hero__search-btn">
            <ArrowRight size={20} />
          </button>
        </motion.div>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <a href="#shield" className="btn btn--primary">Protect Your Work</a>
          <a href="#how" className="btn btn--ghost">Learn More</a>
        </motion.div>

        <motion.div
          className="hero__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <ChevronDown size={20} className="hero__scroll-icon" />
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================
   4A Shield Section
   ============================================ */
const shields = [
  {
    icon: <Shield size={28} />,
    title: 'Anti-AI',
    desc: 'Prevents facial recognition systems from detecting and identifying faces in your photos.',
    tag: 'Identity Protection',
  },
  {
    icon: <ShieldOff size={28} />,
    title: 'Anti-NSFW',
    desc: 'Blocks manipulation of photos into inappropriate content using generative AI or inpainting.',
    tag: 'KBGO Defense',
  },
  {
    icon: <ScanFace size={28} />,
    title: 'Anti-Deepfake',
    desc: 'Breaks the data chain required by AI models to synthesize deepfake videos from still photos.',
    tag: 'Synthesis Disruption',
  },
  {
    icon: <Fingerprint size={28} />,
    title: 'Anti-Training',
    desc: 'Prevents batik, tenun, and local crafts from being used as AI training data without permission.',
    tag: 'Cultural IP Shield',
  },
]

function ShieldSection() {
  return (
    <section className="section shield" id="shield">
      <Reveal>
        <span className="section__label">Core Technology</span>
        <h2 className="section__title">
          Four Layers of Invisible Protection
        </h2>
        <p className="section__subtitle">
          Pixel-level modifications (≤ 8/255) that disrupt AI gradient descent.
          <br />Invisible to human eyes. Mathematically devastating.
        </p>
      </Reveal>

      <div className="shield__grid">
        {shields.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="shield__card">
              <span className="shield__icon">{s.icon}</span>
              <h3 className="shield__card-title">{s.title}</h3>
              <p className="shield__card-desc">{s.desc}</p>
              <span className="shield__tag">{s.tag}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ============================================
   How It Works
   ============================================ */
const steps = [
  {
    icon: <Upload size={32} />,
    title: 'Upload',
    desc: 'Select any photo or artwork you want to protect from AI exploitation.',
  },
  {
    icon: <Cpu size={32} />,
    title: '4A Shield',
    desc: 'Our adversarial perturbation engine applies invisible pixel-level modifications.',
  },
  {
    icon: <Download size={32} />,
    title: 'Download',
    desc: 'Get your protected image — looks identical, but AI can no longer learn from it.',
  },
]

function HowItWorks() {
  return (
    <section className="section how" id="how">
      <Reveal>
        <span className="section__label">Simple Process</span>
        <h2 className="section__title">How It Works</h2>
        <p className="section__subtitle">
          Three steps to make your images invisible to AI — forever.
        </p>
      </Reveal>

      <div className="how__steps">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.15}>
            <div className="how__step">
              <div className="how__step-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="how__step-icon">{step.icon}</div>
              <h3 className="how__step-title">{step.title}</h3>
              <p className="how__step-desc">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ============================================
   Tech Stack
   ============================================ */
const techItems = [
  { name: 'React', icon: <Blocks size={20} /> },
  { name: 'Vite', icon: <Zap size={20} /> },
  { name: 'NestJS', icon: <Box size={20} /> },
  { name: 'TypeScript', icon: <FileCode2 size={20} /> },
  { name: 'Python', icon: <Terminal size={20} /> },
  { name: 'PostgreSQL', icon: <Database size={20} /> },
  { name: 'Redis', icon: <Database size={20} /> },
  { name: 'Supabase', icon: <Cloud size={20} /> },
  { name: 'TensorFlow.js', icon: <Cpu size={20} /> },
  { name: 'Cloudflare R2', icon: <Cloud size={20} /> },
  { name: '4A Shield', icon: <ShieldCheck size={20} /> },
]

function TechStack() {
  const doubled = [...techItems, ...techItems]
  return (
    <section className="tech" id="tech">
      <div className="tech__label">Powered by Modern Tech Stack</div>
      <div className="tech__marquee">
        <div className="tech__track">
          {doubled.map((item, i) => (
            <span className="tech__item" key={i}>
              <span className="tech__icon">{item.icon}</span>
              {item.name}
              <span className="tech__dot" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================
   Stats Section
   ============================================ */
const stats = [
  { number: 'Rp 0', label: 'Launch Cost' },
  { number: '91-97%', label: 'Gross Margin' },
  { number: '<60s', label: 'Processing Time' },
  { number: '4 Layers', label: 'Shield Protection' },
]

function StatsSection() {
  return (
    <section className="section stats" id="stats">
      <Reveal>
        <span className="section__label">By the Numbers</span>
        <h2 className="section__title">Built for Scale</h2>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="stats__grid">
          {stats.map((s) => (
            <div className="stats__item" key={s.label}>
              <div className="stats__number">{s.number}</div>
              <div className="stats__label">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ============================================
   CTA Section
   ============================================ */
function CTASection() {
  return (
    <section className="cta">
      <Reveal>
        <div className="cta__inner">
          <div className="cta__glow" />
          <h2 className="cta__title">
            Start Protecting<br />Your Visual Identity
          </h2>
          <p className="cta__desc">
            Join the movement to make Indonesian cultural heritage invisible to AI exploitation.
            Free tier — no credit card required.
          </p>
          <div className="cta__actions">
            <a href="#hero" className="btn btn--primary btn--lg">Get Started Free</a>
            <a href="http://localhost:3000/docs" target="_blank" rel="noopener" className="btn btn--ghost btn--lg">
              API Documentation
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ============================================
   Footer
   ============================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo-icon">A</span>
          <span className="footer__logo-text">ATHENA</span>
        </div>
        <p className="footer__tagline">
          Advanced Threat Handling & Encryption Network Application
        </p>
        <div className="footer__links">
          <a href="#shield">Shield</a>
          <a href="#how">How It Works</a>
          <a href="#tech">Technology</a>
          <a href="http://localhost:3000/docs" target="_blank" rel="noopener">API Docs</a>
        </div>
        <div className="footer__bottom">
          <span>FIKSI 2026 — Teknologi Digital</span>
          <span>The Wisdom to Protect Your Privacy.</span>
        </div>
      </div>
    </footer>
  )
}

/* ============================================
   Home Page
   ============================================ */
function HomePage() {
  useEffect(() => {
    // Refresh ScrollTrigger after mount
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <Navbar />
      <HeroSection />
      <ShieldSection />
      <HowItWorks />
      <TechStack />
      <StatsSection />
      <CTASection />
      <Footer />
    </>
  )
}

/* ============================================
   App Router
   ============================================ */
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f8f9fa' }} />}>
            <LoginPage />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
