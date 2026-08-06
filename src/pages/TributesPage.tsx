import { TRIBUTES } from '../data/content'
import { PageLayout } from '../components/PageLayout'
import '../components/Tributes.css'

export function TributesPage() {
  return (
    <PageLayout
      label={TRIBUTES.label}
      title={TRIBUTES.title}
      lead={TRIBUTES.lead}
    >
      <div className="tributes__list tributes__list--page">
        {TRIBUTES.items.map((item) => (
          <blockquote key={item.from} className="tributes__item">
            <p className="tributes__note">{item.note}</p>
            <footer className="tributes__from">— {item.from}</footer>
          </blockquote>
        ))}
      </div>
    </PageLayout>
  )
}
