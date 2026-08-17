import { motion } from 'framer-motion'
import { TRIBUTES } from '../data/content'
import { useTributes } from '../hooks/useTributes'
import { ShowMore } from './ShowMore'
import './Tributes.css'

type TributesProps = {
  preview?: boolean
  standalone?: boolean
}

export function Tributes({ preview = false, standalone = false }: TributesProps) {
  const { items, status } = useTributes()
  const shown = preview ? items.slice(0, 3) : items

  return (
    <section
      id={standalone ? undefined : 'tributes'}
      className={`tributes${preview ? ' tributes--preview' : ''}${
        standalone ? ' tributes--standalone' : ''
      }`}
    >
      {standalone ? null : <div className="tributes__band" aria-hidden="true" />}
      <div className={standalone ? undefined : 'section-shell'}>
        {standalone ? null : (
          <>
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
          </>
        )}

        {status === 'loading' ? (
          <p className="tributes__status">Gathering tributes…</p>
        ) : null}

        {status === 'empty' ? (
          <p className="tributes__status">Tributes will appear here as they arrive.</p>
        ) : null}

        {status === 'error' ? (
          <p className="tributes__status">
            The tributes could not be loaded just now. Please refresh the page.
          </p>
        ) : null}

        {shown.length > 0 ? (
          <div
            className={`tributes__list${standalone ? ' tributes__list--page' : ''}`}
          >
            {shown.map((item, index) => (
              <motion.blockquote
                key={`${item.from}-${index}`}
                className="tributes__item"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(index, 8) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="tributes__note">{item.note}</p>
                <footer className="tributes__from">
                  — {item.from}
                  {item.relation ? (
                    <span className="tributes__relation">{item.relation}</span>
                  ) : null}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        ) : null}

        {preview ? <ShowMore to="/tributes" /> : null}
      </div>
    </section>
  )
}
