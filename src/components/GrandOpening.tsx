import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import './GrandOpening.css'

type GrandOpeningProps = {
  onComplete: () => void
}

export function GrandOpening({ onComplete }: GrandOpeningProps) {
  const [phase, setPhase] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 80),
      window.setTimeout(() => setPhase(2), 1200),
      window.setTimeout(() => {
        setVisible(false)
        window.setTimeout(onComplete, 420)
      }, 1500),
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
              className="opening__logo-wrap"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={
                phase >= 1
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.92, y: 12 }
              }
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/images/monogram-logo.png"
                alt="Omo-Oba Boa Olugbewesa — Honouring 70 Years of Wisdom and Grace"
                className="opening__logo"
                width={640}
                height={800}
                decoding="async"
              />
            </motion.div>
          </div>

          <motion.div
            className="opening__curtain opening__curtain--left"
            animate={phase >= 2 ? { x: '-105%' } : { x: '0%' }}
            transition={{ duration: 0.48, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="opening__curtain opening__curtain--right"
            animate={phase >= 2 ? { x: '105%' } : { x: '0%' }}
            transition={{ duration: 0.48, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
