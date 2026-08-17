import { TRIBUTES } from '../data/content'
import { PageLayout } from '../components/PageLayout'
import { Tributes } from '../components/Tributes'
import '../components/Tributes.css'

export function TributesPage() {
  return (
    <PageLayout
      label={TRIBUTES.label}
      title={TRIBUTES.title}
      lead={TRIBUTES.lead}
    >
      <Tributes standalone />
    </PageLayout>
  )
}
