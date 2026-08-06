import { useEffect, useMemo, useState } from 'react'
import { GALLERY } from '../data/content'
import { GalleryGrid } from '../components/GalleryGrid'
import { GallerySlider } from '../components/GallerySlider'
import { PageLayout } from '../components/PageLayout'
import '../components/Gallery.css'
import './GalleryPage.css'

const PAGE_SIZE = 10
type ViewMode = 'grid' | 'slideshow'

export function GalleryPage() {
  const [mode, setMode] = useState<ViewMode>('grid')
  const [page, setPage] = useState(1)
  const [slideIndex, setSlideIndex] = useState(0)

  const total = GALLERY.slots.length
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))

  useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return GALLERY.slots.slice(start, start + PAGE_SIZE)
  }, [page])

  const openInSlideshow = (localIndex: number) => {
    const globalIndex = (page - 1) * PAGE_SIZE + localIndex
    setSlideIndex(globalIndex)
    setMode('slideshow')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageLayout label={GALLERY.label} title={GALLERY.title} lead={GALLERY.lead}>
      <div className="gallery-page">
        <div className="gallery-page__toolbar" role="toolbar" aria-label="Gallery view">
          <div className="gallery-page__modes">
            <button
              type="button"
              className={`gallery-page__mode${mode === 'grid' ? ' is-active' : ''}`}
              aria-pressed={mode === 'grid'}
              onClick={() => setMode('grid')}
            >
              Grid
            </button>
            <button
              type="button"
              className={`gallery-page__mode${mode === 'slideshow' ? ' is-active' : ''}`}
              aria-pressed={mode === 'slideshow'}
              onClick={() => setMode('slideshow')}
            >
              Slideshow
            </button>
          </div>
          <p className="gallery-page__meta">
            {total} photos
            {mode === 'grid' ? ` · page ${page} of ${pageCount}` : null}
          </p>
        </div>

        {mode === 'slideshow' ? (
          <GallerySlider slides={GALLERY.slots} initialIndex={slideIndex} />
        ) : (
          <>
            <GalleryGrid items={pageItems} onSelect={openInSlideshow} />

            {pageCount > 1 ? (
              <div className="gallery-page__pager">
                <button
                  type="button"
                  className="gallery-page__page-btn"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Previous
                </button>

                <div className="gallery-page__pages" aria-label="Pages">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                    (n) => (
                      <button
                        key={n}
                        type="button"
                        className={`gallery-page__page-num${n === page ? ' is-active' : ''}`}
                        aria-current={n === page ? 'page' : undefined}
                        onClick={() => {
                          setPage(n)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                      >
                        {n}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  className="gallery-page__page-btn"
                  disabled={page >= pageCount}
                  onClick={() => {
                    setPage((p) => Math.min(pageCount, p + 1))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Next
                </button>
              </div>
            ) : null}

            <p className="gallery-page__tip">
              Tip: tap any photo to open it in slideshow view.
            </p>
          </>
        )}
      </div>
    </PageLayout>
  )
}
