import { motion } from 'framer-motion'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer__inner">
        <motion.p
          className="footer__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          With love, today and always
        </motion.p>

        <motion.h2
          className="footer__name"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Ọmọ-Ọba Boa Olugbewesa
        </motion.h2>

        <motion.div
          className="footer__rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="footer__wish"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Happy Birthday
        </motion.p>
      </div>
    </footer>
  )
}
