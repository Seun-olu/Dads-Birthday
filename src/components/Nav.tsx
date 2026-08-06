import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/content'
import './Nav.css'

type NavProps = {
  ready?: boolean
}

export function Nav({ ready = true }: NavProps) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = location.pathname === '/'

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
    return () => document.body.classList.remove('nav-open')
  }, [menuOpen])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav${menuOpen ? ' is-open' : ''}${scrolled || !isHome ? ' is-solid' : ''}`}
      initial={{ y: -24, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav__bar">
        <Link to="/" className="nav__brand" onClick={() => setMenuOpen(false)}>
          ỌMỌ-ỌBA
        </Link>

        <button
          type="button"
          className={`nav__toggle${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="primary-nav"
        className={`nav__drawer${menuOpen ? ' is-open' : ''}`}
        aria-label="Primary"
        aria-hidden={!menuOpen}
      >
        <div className="nav__drawer-inner">
          <p className="nav__drawer-label">Explore</p>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              tabIndex={menuOpen ? 0 : -1}
              className={({ isActive }) =>
                `nav__link${isActive ? ' is-active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <nav className="nav__desktop" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav__link${isActive ? ' is-active' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </motion.header>
  )
}
