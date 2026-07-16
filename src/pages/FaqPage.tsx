import { Link } from 'react-router-dom'
import { PageHead, Reveal } from '../components/motion'
import { FaqAccordion } from '../components/FaqAccordion'
import { FAQ } from '../data'

export default function FaqPage() {
  return (
    <>
      <section className="section page-head">
        <PageHead>
          <span className="eyebrow">Вопросы</span>
          <h2>Спрашивают чаще всего</h2>
          <p className="section-sub">
            Собрали ответы на вопросы, которые слышим почти в каждом разговоре.
            Не нашли свой — позвоните, обсудим.
          </p>
        </PageHead>
      </section>

      <section className="section section-tight">
        <Reveal className="faq-list">
          <FaqAccordion items={FAQ} />
        </Reveal>
      </section>

      <section className="section cta-band">
        <Reveal>
          <h2>Остались вопросы?</h2>
          <p className="section-sub">
            Оставьте телефон — инженер перезвонит и ответит на всё
            по-человечески.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to="/contact">
              Задать вопрос
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
