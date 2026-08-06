import { motion } from 'framer-motion'
import { JOURNEY } from '../data/content'
import { ShowMore } from './ShowMore'
import './Journey.css'

type JourneyProps = {
  preview?: boolean
}

export function Journey({ preview = false }: JourneyProps) {
  const milestones = preview ? JOURNEY.milestones.slice(0, 2) : JOURNEY.milestones

  return (
    <section
      id="journey"
      className={`journey${preview ? ' journey--preview' : ''}`}
    >
      <div className="section-shell">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {JOURNEY.label}
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {JOURNEY.title}
        </motion.h2>

        <motion.p
          className="section-lead"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {JOURNEY.lead}
        </motion.p>

        <ol className="journey__list">
          {milestones.map((item, index) => (
            <motion.li
              key={item.year}
              className="journey__item"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="journey__marker" aria-hidden="true">
                <span />
              </div>
              <div className="journey__content">
                <p className="journey__year">{item.year}</p>
                <h3 className="journey__title">{item.title}</h3>
                <p className="journey__text">{item.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        {preview ? <ShowMore to="/journey" /> : null}
      </div>
    </section>
  )
}
