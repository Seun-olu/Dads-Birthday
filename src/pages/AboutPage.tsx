import { ABOUT } from '../data/content'
import { PageLayout } from '../components/PageLayout'
import './AboutPage.css'

export function AboutPage() {
  return (
    <PageLayout label={ABOUT.label} title={ABOUT.title} lead={ABOUT.lead}>
      <div className="about-page">
        <div className="about-page__copy">
          {ABOUT.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <dl className="about-page__facts">
          {ABOUT.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </PageLayout>
  )
}
