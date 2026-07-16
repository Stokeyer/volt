import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { PageHead, Reveal } from '../components/motion'
import { AnimatedNumber } from '../components/AnimatedNumber'
import {
  DEFAULT_APPLIANCES,
  PRESETS,
  PRODUCTS,
  fmtPrice,
  plural,
  type Appliance,
  type Preset,
} from '../data'

export default function CalculatorPage() {
  const [items, setItems] = useState<Appliance[]>(DEFAULT_APPLIANCES)
  const [tariff, setTariff] = useState(6)
  const [nextId, setNextId] = useState(100)

  const addPreset = (p: Preset) => {
    setItems((prev) => [
      ...prev,
      { id: nextId, name: p.name, watts: p.watts, count: 1, hours: p.hours },
    ])
    setNextId((n) => n + 1)
  }

  const addEmpty = () => {
    setItems((prev) => [
      ...prev,
      { id: nextId, name: 'Мой прибор', watts: 100, count: 1, hours: 1 },
    ])
    setNextId((n) => n + 1)
  }

  const update = (id: number, patch: Partial<Appliance>) =>
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)))

  const remove = (id: number) =>
    setItems((prev) => prev.filter((a) => a.id !== id))

  const stats = useMemo(() => {
    const dailyKwh = items.reduce(
      (sum, a) => sum + (a.watts * a.count * a.hours) / 1000,
      0,
    )
    const peakKw = items.reduce((sum, a) => sum + (a.watts * a.count) / 1000, 0)
    const monthlyKwh = dailyKwh * 30
    const monthlyCost = monthlyKwh * tariff
    const recommended =
      PRODUCTS.find((p) => p.capacity >= dailyKwh && p.power >= peakKw * 0.7) ??
      PRODUCTS[PRODUCTS.length - 1]
    const autonomyH = Math.round(
      (recommended.capacity / Math.max(dailyKwh, 0.01)) * 24,
    )
    return { dailyKwh, peakKw, monthlyKwh, monthlyCost, recommended, autonomyH }
  }, [items, tariff])

  return (
    <>
      <section className="section page-head">
        <PageHead>
          <span className="eyebrow">Калькулятор</span>
          <h2>Сколько энергии съедает ваш дом?</h2>
          <p className="section-sub">
            Отметьте приборы, которыми пользуетесь, — и мы честно посчитаем,
            сколько кВт·ч вам нужно и какой накопитель подойдёт. Без звонков и
            менеджеров.
          </p>
        </PageHead>
      </section>

      <section className="section section-tight">
        <Reveal className="calc-presets">
          {PRESETS.map((p) => (
            <button key={p.name} className="chip" onClick={() => addPreset(p)}>
              {p.name}
            </button>
          ))}
          <button className="chip chip-custom" onClick={addEmpty}>
            <Plus size={15} /> добавить свой
          </button>
        </Reveal>

        <Reveal index={1} className="calc-table-wrap">
        <div className="calc-table" role="table" aria-label="Список приборов">
          <div className="calc-row calc-head" role="row">
            <span>Прибор</span>
            <span>Мощность, Вт</span>
            <span>Шт.</span>
            <span>Часов в день</span>
            <span>кВт·ч/день</span>
            <span />
          </div>
          {items.length === 0 && (
            <div className="calc-empty">
              Пока пусто. Нажмите на прибор выше — он появится здесь.
            </div>
          )}
          <AnimatePresence initial={false}>
            {items.map((a) => (
              <motion.div
                className="calc-row"
                role="row"
                key={a.id}
                layout
                initial={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  paddingTop: 11,
                  paddingBottom: 11,
                }}
                exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{ overflow: 'hidden' }}
              >
              <input
                type="text"
                value={a.name}
                aria-label="Название прибора"
                onChange={(e) => update(a.id, { name: e.target.value })}
              />
              <input
                type="number"
                min={0}
                value={a.watts}
                aria-label="Мощность, Вт"
                onChange={(e) =>
                  update(a.id, { watts: Math.max(0, Number(e.target.value)) })
                }
              />
              <input
                type="number"
                min={1}
                value={a.count}
                aria-label="Количество"
                onChange={(e) =>
                  update(a.id, { count: Math.max(1, Number(e.target.value)) })
                }
              />
              <input
                type="number"
                min={0}
                max={24}
                step={0.5}
                value={a.hours}
                aria-label="Часов в сутки"
                onChange={(e) =>
                  update(a.id, {
                    hours: Math.min(24, Math.max(0, Number(e.target.value))),
                  })
                }
              />
              <span className="calc-kwh">
                <AnimatedNumber
                  value={(a.watts * a.count * a.hours) / 1000}
                  digits={2}
                />
              </span>
              <button
                className="calc-remove"
                aria-label={`Убрать ${a.name}`}
                title="Убрать"
                onClick={() => remove(a.id)}
              >
                <X size={17} />
              </button>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
        </Reveal>

        <Reveal index={2} className="calc-tariff">
          <label htmlFor="tariff">Ваш тариф, ₽ за кВт·ч</label>
          <input
            id="tariff"
            type="number"
            min={0}
            step={0.1}
            value={tariff}
            onChange={(e) => setTariff(Math.max(0, Number(e.target.value)))}
          />
          <span className="calc-tariff-hint">
            — обычно указан в квитанции за свет
          </span>
        </Reveal>

        <Reveal index={3} className="calc-results">
          <div className="stat">
            <span className="stat-value">
              <AnimatedNumber value={stats.dailyKwh} digits={2} />
            </span>
            <span className="stat-label">кВт·ч в день</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              <AnimatedNumber value={stats.monthlyKwh} digits={0} />
            </span>
            <span className="stat-label">кВт·ч в месяц</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              <AnimatedNumber value={stats.monthlyCost} digits={0} /> ₽
            </span>
            <span className="stat-label">платите за свет в месяц</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              <AnimatedNumber value={stats.peakKw} digits={1} /> кВт
            </span>
            <span className="stat-label">если включить всё сразу</span>
          </div>
        </Reveal>

        {stats.dailyKwh > 0 && (
          <motion.div
            className="calc-recommendation"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <span className="eyebrow">Наш совет</span>
              <h3>Вам подойдёт {stats.recommended.name}</h3>
              <p>
                Его {stats.recommended.capacity} кВт·ч хватит на ваши{' '}
                <strong>
                  <AnimatedNumber value={stats.dailyKwh} digits={1} /> кВт·ч
                </strong>{' '}
                в день с запасом. Если отключат свет — дом проживёт на батарее
                примерно{' '}
                <strong>
                  <AnimatedNumber value={stats.autonomyH} digits={0} />{' '}
                  {plural(stats.autonomyH, 'час', 'часа', 'часов')}
                </strong>
                , не меняя привычек.
              </p>
            </div>
            <Link className="btn btn-primary" to="/models">
              Посмотреть — {fmtPrice(stats.recommended.price)}
            </Link>
          </motion.div>
        )}
      </section>
    </>
  )
}
