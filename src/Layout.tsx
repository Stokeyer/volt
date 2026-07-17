import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Mail, Menu, Phone, X, Zap } from 'lucide-react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Плавный инерционный скролл (Lenis) — только для мыши/трекпада
function useSmoothScroll(paused: boolean) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // На тач-устройствах — только нативный скролл (Lenis + syncTouch давали рваный лаг)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const lenis = new Lenis({
      // lerp имеет приоритет над duration: чем меньше, тем «тягучее»
      lerp: 0.06,
      wheelMultiplier: 1.1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
    })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Останавливаем скролл под открытым мобильным меню
  useEffect(() => {
    if (paused) lenisRef.current?.stop()
    else lenisRef.current?.start()
  }, [paused])

  return lenisRef
}

const NAV_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/models', label: 'Модели' },
  { to: '/calculator', label: 'Калькулятор' },
  { to: '/faq', label: 'Вопросы' },
  { to: '/contact', label: 'Контакты' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const lenisRef = useSmoothScroll(menuOpen)

  // При смене страницы мгновенно возвращаемся наверх
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, lenisRef])

  // Закрываем меню при переходе на другую страницу
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Блокируем прокрутку под открытым меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      {/* Декоративные боковые рейки (видны только на широких экранах) */}
      <div className="side-rail side-rail-left" aria-hidden="true">
        <span className="rail-label">220 В · 50 Гц</span>
        <div className="rail-line">
          <span className="rail-pulse" />
        </div>
        <div className="rail-ticks">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
      <div className="side-rail side-rail-right" aria-hidden="true">
        <span className="rail-label">энергия у вас дома</span>
        <div className="rail-line">
          <span className="rail-pulse rail-pulse-slow" />
        </div>
      </div>

      <header className="header">
        <Link className="logo" to="/">
          <span className="logo-mark" aria-hidden="true">
            <Zap size={17} strokeWidth={2.5} />
          </span>
          volt
        </Link>
        <nav className="header-nav">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-right">
          <button
            className="burger"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <nav className="mobile-nav">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <NavLink to={l.to} end={l.to === '/'}>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * NAV_LINKS.length, duration: 0.25 }}
              >
                <Link className="btn btn-primary mobile-menu-cta" to="/contact">
                  Оставить заявку
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col">
            <span className="footer-logo">volt</span>
            <p>
              Домашние системы хранения энергии.
              <br />
              Ставятся за день, работают годами.
            </p>
          </div>
          <div className="footer-col">
            <span className="footer-title">Разделы</span>
            <Link to="/models">Модели</Link>
            <Link to="/calculator">Калькулятор кВт·ч</Link>
            <Link to="/faq">Частые вопросы</Link>
          </div>
          <div className="footer-col">
            <span className="footer-title">Связаться</span>
            <a href="tel:+79000000000">
              <Phone size={15} /> +7 (900) 000-00-00
            </a>
            <a href="mailto:info@volt.example">
              <Mail size={15} /> info@volt.example
            </a>
            <span className="footer-line">
              <Clock size={15} /> Ежедневно с 9:00 до 21:00
            </span>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Volt — энергия у вас дома</div>
      </footer>
    </>
  )
}
