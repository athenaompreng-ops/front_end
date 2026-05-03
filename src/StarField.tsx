import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number // depth layer 0-1
  size: number
  baseOpacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const starsRef = useRef<Star[]>([])
  const animIdRef = useRef<number>(0)
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.scale(dpr, dpr)
      createStars()
    }

    // Create stars with depth layers
    const createStars = () => {
      const count = Math.min(Math.floor(window.innerWidth / 5), 300)
      const w = window.innerWidth
      const h = window.innerHeight
      starsRef.current = Array.from({ length: count }, () => {
        const z = Math.random() // depth: 0 = far, 1 = near
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          size: 0.3 + z * 1.8, // far stars small, near stars bigger
          baseOpacity: 0.15 + z * 0.55,
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinkleOffset: Math.random() * Math.PI * 2,
        }
      })
    }

    // Animation loop
    let lastTime = 0
    const draw = (timestamp: number) => {
      if (!visibleRef.current) return // BREAK LOOP COMPLETELY

      const dt = Math.min((timestamp - lastTime) / 1000, 0.1)
      lastTime = timestamp

      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      // Smooth mouse interpolation
      const lerp = 0.05
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerp
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerp

      const mx = (smoothMouseRef.current.x - 0.5) * 2 // -1 to 1
      const my = (smoothMouseRef.current.y - 0.5) * 2

      for (const star of starsRef.current) {
        // Parallax offset based on depth
        const parallaxX = mx * star.z * 30
        const parallaxY = my * star.z * 20

        const sx = star.x + parallaxX
        const sy = star.y + parallaxY

        // Twinkle
        const twinkle = Math.sin(timestamp * 0.001 * star.twinkleSpeed + star.twinkleOffset)
        const opacity = star.baseOpacity * (0.6 + 0.4 * twinkle)

        // Draw star
        ctx.beginPath()
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()

        // Add glow for brighter stars
        if (star.z > 0.7 && opacity > 0.5) {
          ctx.beginPath()
          ctx.arc(sx, sy, star.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`
          ctx.fill()
        }

        // Slow drift
        star.y -= dt * (0.5 + star.z * 1.5)
        if (star.y < -10) {
          star.y = h + 10
          star.x = Math.random() * w
        }
      }

      // Subtle nebula glow at center-top
      const nebulaGrad = ctx.createRadialGradient(
        w * 0.5, h * 0.15, 0,
        w * 0.5, h * 0.15, w * 0.5
      )
      nebulaGrad.addColorStop(0, 'rgba(255, 255, 255, 0.02)')
      nebulaGrad.addColorStop(0.5, 'rgba(200, 200, 220, 0.008)')
      nebulaGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = nebulaGrad
      ctx.fillRect(0, 0, w, h)

      animIdRef.current = requestAnimationFrame(draw)
    }

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = e.clientY / window.innerHeight
    }

    // Visibility observer — pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visibleRef.current
        visibleRef.current = entry.isIntersecting
        if (!wasVisible && entry.isIntersecting) {
          lastTime = performance.now()
          animIdRef.current = requestAnimationFrame(draw)
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    resize()
    animIdRef.current = requestAnimationFrame(draw)
    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animIdRef.current)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        mixBlendMode: 'screen',
      }}
    />
  )
}
