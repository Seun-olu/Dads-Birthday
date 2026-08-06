import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ShowMore.css'

type ShowMoreProps = {
  to: string
  label?: string
}

export function ShowMore({ to, label = 'Show more' }: ShowMoreProps) {
  return (
    <motion.div
      className="show-more"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={to} className="show-more__link">
        <span>{label}</span>
        <span className="show-more__arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </motion.div>
  )
}
