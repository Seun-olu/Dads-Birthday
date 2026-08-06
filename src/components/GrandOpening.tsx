import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import './GrandOpening.css'

type GrandOpeningProps = {
  onComplete: () => void
}

const NAME = 'ỌMỌ-ỌBA BOA OLUGBEWESA'

export function GrandOpening({ onComplete }: GrandOpeningProps) {
  const [phase, setPhase] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 80),
      window.setTimeout(() => setPhase(2), 280),
      window.setTimeout(() => setPhase(3), 780),
      window.setTimeout(() => setPhase(4), 1200),
      window.setTimeout(() => {
        setVisible(false)
        window.setTimeout(onComplete, 400)
      }, 1450),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!visible}
        >
          <div className="opening__veil" />
          <div className="opening__glow" />

          <div className="opening__center">
            <motion.div
              className="opening__portrait-wrap"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={
                phase >= 1
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.88 }
              }
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="opening__ring opening__ring--outer"
                animate={
                  phase >= 1
                    ? { opacity: 0.7, scale: 1 }
                    : { opacity: 0, scale: 0.85 }
                }
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="opening__portrait">
                <img
                  src="/images/portrait-studio.webp"
                  alt=""
                  className="opening__portrait-img"
                  width={480}
                  height={600}
                  decoding="async"
                />
              </div>
            </motion.div>

            <motion.p
              className="opening__eyebrow"
              initial={{ opacity: 0, y: 8 }}
              animate={
                phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
              }
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              A birthday celebration
            </motion.p>

            <h1 className="opening__name" aria-label={NAME}>
              {NAME.split('').map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  className={char === ' ' ? 'opening__space' : undefined}
                  initial={{ opacity: 0, y: 14 }}
                  animate={
                    phase >= 2
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 14 }
                  }
                  transition={{
                    duration: 0.26,
                    delay: phase >= 2 ? i * 0.01 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="opening__rule"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                phase >= 3
                  ? { scaleX: 1, opacity: 1 }
                  : { scaleX: 0, opacity: 0 }
              }
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              className="opening__tagline"
              initial={{ opacity: 0, y: 8 }}
              animate={
                phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
              }
              transition={{ duration: 0.28, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              Honour · Legacy · Love
            </motion.p>
          </div>

          <motion.div
            className="opening__curtain opening__curtain--left"
            animate={phase >= 4 ? { x: '-105%' } : { x: '0%' }}
            transition={{ duration: 0.48, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="opening__curtain opening__curtain--right"
            animate={phase >= 4 ? { x: '105%' } : { x: '0%' }}
            transition={{ duration: 0.48, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
