import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GALLERY } from '../data/content'
import { GallerySlider } from './GallerySlider'
import { ShowMore } from './ShowMore'
import './Gallery.css'

type GalleryProps = {
  preview?: boolean
}

export function Gallery({ preview = false }: GalleryProps) {
  const slides = preview ? GALLERY.slots.slice(0, 8) : GALLERY.slots

  return (
    <section
      id="gallery"
      className={`gallery${preview ? ' gallery--preview' : ''}`}
    >
      <div className="section-shell">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {GALLERY.label}
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {GALLERY.title}
        </motion.h2>

        <motion.p
          className="section-lead"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {preview
            ? 'Swipe through treasured frames — tap View all for the full collection.'
            : GALLERY.lead}
        </motion.p>

        <GallerySlider slides={slides} />

        {preview ? (
          <div className="gallery__footer">
            <ShowMore to="/gallery" label="View all photos" />
            <Link to="/gallery" className="gallery__count-link">
              {GALLERY.slots.length} moments
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
