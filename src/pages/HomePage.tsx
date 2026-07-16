import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  PlugZap,
  MoonStar,
  Sun,
  Smartphone,
} from 'lucide-react'
import { fadeUp } from '../components/motion'

const HOW = [
  {
    icon: PlugZap,
    title: 'Когда сеть пропадает',
    text: 'Батарея подхватывает дом за 10 миллисекунд. Компьютер не перезагрузится, котёл не остановится, вы, скорее всего, вообще ничего не заметите.',
  },
  {
    icon: MoonStar,
    title: 'Пока вы спите',
    text: 'Накопитель заряжается по ночному тарифу — он в 2–3 раза дешевле дневного. Утром дом просыпается и живёт на дешёвой энергии.',
  },
  {
    icon: Sun,
    title: 'Если есть солнечные панели',
    text: 'Днём солнце заряжает батарею, вечером вы тратите своё. Многие наши клиенты летом почти не берут энергию из сети.',
  },
  {
    icon: Smartphone,
    title: 'И всё это — видно',
    text: 'В приложении: сколько запасено, сколько тратите, сколько сэкономили. Приятно смотреть, честно говоря.',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-glow" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="eyebrow">Домашние накопители энергии</span>
          <h1>
            Свет отключили.
            <br />
            <em>А у вас — нет.</em>
          </h1>
          <p className="hero-sub">
            Volt — батарея для дома, которая незаметно берёт на себя питание,
            когда пропадает сеть, и экономит на ночном тарифе, когда сеть есть.
            Ставится за один день, работает годами.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to="/calculator">
              Посчитать мой дом
              <ArrowRight size={18} />
            </Link>
            <Link className="btn btn-ghost btn-lg" to="/models">
              Смотреть модели
            </Link>
          </div>
        </motion.div>
        <div className="hero-stats">
          {[
            ['10 мс', 'на переключение — лампочка не мигнёт'],
            ['до −30%', 'к счетам за свет на ночном тарифе'],
            ['1 день', 'от заявки до работающей системы'],
          ].map(([v, label], i) => (
            <motion.div
              key={v}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <strong>{v}</strong>
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section">
        <motion.div {...fadeUp}>
          <span className="eyebrow">Как это работает</span>
          <h2>Один ящик на стене — и дом живёт по своим правилам</h2>
        </motion.div>
        <div className="benefits-grid">
          {HOW.map((b, i) => (
            <motion.div
              className="benefit-card"
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="benefit-icon" aria-hidden="true">
                <b.icon size={24} strokeWidth={1.8} />
              </span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="section-more">
          <Link className="btn btn-ghost" to="/models">
            Смотреть модели
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="section cta-band">
        <motion.div {...fadeUp}>
          <h2>Не уверены, какая модель нужна?</h2>
          <p className="section-sub">
            Посчитайте потребление дома в калькуляторе — это две минуты. Или
            оставьте телефон, и инженер посчитает вместе с вами.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to="/calculator">
              Открыть калькулятор
            </Link>
            <Link className="btn btn-ghost btn-lg" to="/contact">
              Оставить заявку
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
