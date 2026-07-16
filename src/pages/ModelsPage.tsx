import { Link } from 'react-router-dom'
import { BatteryFull, Cpu, Sun, Waves } from 'lucide-react'
import { PageHead, Reveal } from '../components/motion'
import { ProductGrid } from '../components/ProductCard'

const SPECS = [
  {
    icon: BatteryFull,
    title: 'Батарея LiFePO4',
    text: 'Литий-железо-фосфатные ячейки — самый безопасный тип литиевых батарей. Не горят, не боятся глубокого разряда, ресурс от 6000 циклов.',
  },
  {
    icon: Waves,
    title: 'Гибридный инвертор',
    text: 'Чистая синусоида на выходе — можно питать любую технику, включая котлы и медицинское оборудование. Переключение на резерв за 10 мс.',
  },
  {
    icon: Cpu,
    title: 'Система управления',
    text: 'BMS следит за каждой ячейкой: температура, заряд, баланс. Приложение показывает всю картину и предупреждает заранее.',
  },
  {
    icon: Sun,
    title: 'Готовность к солнцу',
    text: 'Во всех моделях от Home 10 — вход для солнечных панелей. Можно поставить накопитель сейчас, а панели добавить потом.',
  },
]

export default function ModelsPage() {
  return (
    <>
      <section className="section page-head">
        <PageHead>
          <span className="eyebrow">Каталог</span>
          <h2>Модели Volt</h2>
          <p className="section-sub">
            Четыре размера под разные дома. Все — на батареях LiFePO4: они не
            боятся глубокого разряда, не горят и спокойно живут 15+ лет.
          </p>
        </PageHead>
      </section>

      <section className="section section-tight">
        <ProductGrid />
      </section>

      <section className="section">
        <Reveal>
          <span className="eyebrow">Что внутри</span>
          <h2>Одинаково надёжная начинка в каждой модели</h2>
        </Reveal>
        <div className="specs-grid">
          {SPECS.map((s, i) => (
            <Reveal className="spec-item" key={s.title} index={i}>
              <span className="benefit-icon" aria-hidden="true">
                <s.icon size={24} strokeWidth={1.8} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section cta-band">
        <Reveal>
          <h2>Какая модель подойдёт вашему дому?</h2>
          <p className="section-sub">
            Отметьте свои приборы в калькуляторе — он посчитает потребление и
            подскажет модель с нужным запасом.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to="/calculator">
              Подобрать по калькулятору
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
