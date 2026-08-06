import { JOURNEY } from '../data/content'
import { PageLayout } from '../components/PageLayout'
import '../components/Journey.css'

export function JourneyPage() {
  return (
    <PageLayout label={JOURNEY.label} title={JOURNEY.title} lead={JOURNEY.lead}>
      <ol className="journey__list journey__list--page">
        {JOURNEY.milestones.map((item) => (
          <li key={item.year} className="journey__item">
            <div className="journey__marker" aria-hidden="true">
              <span />
            </div>
            <div className="journey__content">
              <p className="journey__year">{item.year}</p>
              <h2 className="journey__title">{item.title}</h2>
              <p className="journey__text">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageLayout>
  )
}
