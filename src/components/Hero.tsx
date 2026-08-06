import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

type HeroProps = {
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['0%', '12%']
  )
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['0%', '18%']
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    reduceMotion ? [1, 1] : [1, 0.35]
  )

  return (
    <section ref={ref} id="top" className="hero">
      <motion.div className="hero__media" style={{ y: imageY }}>
        <img
          src="/images/portrait-studio.webp"
          alt="Studio portrait of Ọmọ-Ọba Boa Olugbewesa"
          className="hero__image"
          width={1200}
          height={1500}
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero__scrim" />
      </motion.div>

      <motion.div
        className="hero__content"
        style={{ y: contentY, opacity }}
        initial={{ opacity: 0, y: 28 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero__brand">Ọmọ-Ọba Boa Olugbewesa</p>
        <h1 className="hero__headline">A life written in honour</h1>
        <p className="hero__support">
          Walk through the story of a father, mentor, and pillar — celebrated
          today by those who love him most.
        </p>

        <div className="hero__actions">
          <Link to="/about" className="hero__cta">
            Begin his story
          </Link>
          <Link to="/gallery" className="hero__cta hero__cta--ghost">
            View moments
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
