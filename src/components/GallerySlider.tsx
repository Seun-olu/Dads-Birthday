import {
  animate,
  motion,
  useMotionValue,
  type PanInfo,
} from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import type { GallerySlot } from '../data/gallery'
import './GallerySlider.css'

type GallerySliderProps = {
  slides: GallerySlot[]
  initialIndex?: number
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      {dir === 'left' ? (
        <path
          d="M14.5 5.5 L8.5 12 L14.5 18.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9.5 5.5 L15.5 12 L9.5 18.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

function prefetch(src?: string) {
  if (!src || typeof window === 'undefined') return
  const img = new Image()
  img.decoding = 'async'
  img.src = src
}

export function GallerySlider({
  slides,
  initialIndex = 0,
}: GallerySliderProps) {
  const [index, setIndex] = useState(initialIndex)
  const [paused, setPaused] = useState(false)
  const x = useMotionValue(0)
  const count = slides.length
  const active = slides[index]

  useEffect(() => {
    setIndex(Math.min(initialIndex, Math.max(count - 1, 0)))
  }, [initialIndex, count])

  useEffect(() => {
    if (count < 2) return
    prefetch(slides[(index + 1) % count]?.src)
    prefetch(slides[(index - 1 + count) % count]?.src)
  }, [index, count, slides])

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return
      const wrapped = ((next % count) + count) % count
      setIndex(wrapped)
      void animate(x, 0, { type: 'spring', stiffness: 320, damping: 32 })
    },
    [count, x]
  )

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])
  const goNext = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (paused || count < 2) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, 4800)
    return () => window.clearInterval(id)
  }, [paused, count, index])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 56
    if (info.offset.x < -threshold || info.velocity.x < -400) {
      goNext()
      return
    }
    if (info.offset.x > threshold || info.velocity.x > 400) {
      goPrev()
      return
    }
    void animate(x, 0, { type: 'spring', stiffness: 380, damping: 34 })
  }

  if (!active) return null

  return (
    <div
      className="gallery-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="gallery-slider__stage">
        <div className="gallery-slider__glow" aria-hidden="true" />

        <motion.div
          className="gallery-slider__track"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          style={{ x }}
          onDragEnd={onDragEnd}
        >
          <motion.figure
            key={active.src}
            className="gallery-slider__frame"
            initial={{ opacity: 0.55, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={active.src}
              alt={active.alt}
              className="gallery-slider__image"
              draggable={false}
              decoding="async"
              fetchPriority="high"
            />
            <div className="gallery-slider__vignette" aria-hidden="true" />
            <figcaption className="gallery-slider__caption">
              <span className="gallery-slider__count">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(count).padStart(2, '0')}
              </span>
              <span className="gallery-slider__title">{active.label}</span>
            </figcaption>
          </motion.figure>
        </motion.div>

        {count > 1 ? (
          <div className="gallery-slider__nav-row">
            <button
              type="button"
              className="gallery-slider__nav"
              aria-label="Previous photo"
              onClick={goPrev}
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              className="gallery-slider__nav"
              aria-label="Next photo"
              onClick={goNext}
            >
              <Chevron dir="right" />
            </button>
          </div>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="gallery-slider__controls">
          <div className="gallery-slider__progress" aria-hidden="true">
            <motion.span
              key={index}
              className="gallery-slider__progress-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: paused ? 0 : 1 }}
              transition={{
                duration: paused ? 0.2 : 4.8,
                ease: 'linear',
              }}
            />
          </div>

          {count <= 10 ? (
            <div
              className="gallery-slider__dots"
              role="tablist"
              aria-label="Gallery slides"
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to ${slide.label}`}
                  className={`gallery-slider__dot${i === index ? ' is-active' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          ) : (
            <p className="gallery-slider__hint">
              Swipe or tap the arrows to browse
            </p>
          )}

          <div className="gallery-slider__thumbs">
            {slides.map((slide, i) => (
              <button
                key={`thumb-${slide.src}`}
                type="button"
                className={`gallery-slider__thumb${i === index ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Show ${slide.label}`}
              >
                <img
                  src={slide.thumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
