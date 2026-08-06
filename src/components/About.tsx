import { motion } from 'framer-motion'
import { ABOUT } from '../data/content'
import { ShowMore } from './ShowMore'
import './About.css'

type AboutProps = {
  preview?: boolean
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function About({ preview = false }: AboutProps) {
  const paragraphs = preview ? [ABOUT.preview] : ABOUT.paragraphs

  return (
    <section id="about" className={`about${preview ? ' about--preview' : ''}`}>
      <div className="about__atmosphere" aria-hidden="true" />
      <div className="section-shell about__inner">
        <motion.p
          className="section-label"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {ABOUT.label}
        </motion.p>

        <div className="about__grid">
          <div className="about__copy">
            <motion.h2
              className="section-title"
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {ABOUT.title}
            </motion.h2>

            <motion.p
              className="section-lead"
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {ABOUT.lead}
            </motion.p>

            <motion.div
              className="about__body"
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </motion.div>

            {preview ? <ShowMore to="/about" /> : null}
          </div>

          <motion.aside
            className="about__aside"
            variants={fadeUp}
            custom={4}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <dl className="about__facts">
              {ABOUT.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
