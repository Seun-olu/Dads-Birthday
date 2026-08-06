import { motion } from 'framer-motion'
import type { GallerySlot } from '../data/gallery'
import './GalleryGrid.css'

type GalleryGridProps = {
  items: GallerySlot[]
  onSelect?: (index: number) => void
}

export function GalleryGrid({ items, onSelect }: GalleryGridProps) {
  return (
    <div className="gallery-grid">
      {items.map((item, index) => (
        <motion.button
          key={item.src}
          type="button"
          className="gallery-grid__item"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.45,
            delay: Math.min(index, 8) * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={() => onSelect?.(index)}
          aria-label={`Open ${item.label}`}
        >
          <span className="gallery-grid__frame">
            <img
              src={item.thumb}
              alt={item.alt}
              className="gallery-grid__image"
              loading="lazy"
              decoding="async"
            />
            <span className="gallery-grid__shade" aria-hidden="true" />
            <span className="gallery-grid__label">{item.label}</span>
          </span>
        </motion.button>
      ))}
    </div>
  )
}
