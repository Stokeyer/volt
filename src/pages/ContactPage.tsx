import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHead, Reveal } from '../components/motion'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  return (
    <section className="section page-head contact">
      <PageHead>
        <span className="eyebrow">Заявка</span>
        <h2>Давайте подберём вместе</h2>
        <p className="section-sub">
          Оставьте телефон — инженер (не продавец) перезвонит, задаст пару
          вопросов про дом и честно скажет, какая модель нужна. Или что не
          нужна вовсе.
        </p>
      </PageHead>
      {sent ? (
        <motion.div
          className="contact-thanks"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          Спасибо! Перезвоним в течение часа в рабочее время. А пока можно
          посмотреть модели или поиграть с калькулятором.
        </motion.div>
      ) : (
        <Reveal index={1}>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <input
              type="text"
              placeholder="Как вас зовут?"
              required
              aria-label="Имя"
            />
            <input
              type="tel"
              placeholder="+7 900 000-00-00"
              required
              aria-label="Телефон"
            />
            <button type="submit" className="btn btn-primary">
              Жду звонка
            </button>
          </form>
        </Reveal>
      )}
      <p className="contact-note">
        Никакого спама и «уникальных предложений». Один звонок по делу.
      </p>
    </section>
  )
}
