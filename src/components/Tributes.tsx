import { motion } from 'framer-motion'
import { TRIBUTES } from '../data/content'
import { ShowMore } from './ShowMore'
import './Tributes.css'

type TributesProps = {
  preview?: boolean
}

export function Tributes({ preview = false }: TributesProps) {
  const items = preview ? TRIBUTES.items.slice(0, 2) : TRIBUTES.items

  return (
    <section
      id="tributes"
      className={`tributes${preview ? ' tributes--preview' : ''}`}
    >
      <div className="tributes__band" aria-hidden="true" />
      <div className="section-shell">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {TRIBUTES.label}
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {TRIBUTES.title}
        </motion.h2>

        <motion.p
          className="section-lead"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {TRIBUTES.lead}
        </motion.p>

        <div className="tributes__list">
          {items.map((item, index) => (
            <motion.blockquote
              key={item.from}
              className="tributes__item"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="tributes__note">{item.note}</p>
              <footer className="tributes__from">— {item.from}</footer>
            </motion.blockquote>
          ))}
        </div>

        {preview ? <ShowMore to="/tributes" /> : null}
      </div>
    </section>
  )
}
