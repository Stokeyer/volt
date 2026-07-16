export type Product = {
  id: string
  name: string
  capacity: number // кВт·ч
  power: number // кВт (макс. выходная мощность)
  price: number // ₽
  tag?: string
  forWhom: string
  features: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'home-5',
    name: 'Volt Home 5',
    capacity: 5,
    power: 3,
    price: 289_000,
    forWhom: 'Для квартиры или дачи',
    features: [
      'Холодильник, свет и роутер — сутки без сети',
      'Вешается на стену, размером с картину',
      'Тише шёпота — 25 дБ',
      'Гарантия 5 лет',
    ],
  },
  {
    id: 'home-10',
    name: 'Volt Home 10',
    capacity: 10,
    power: 5,
    price: 489_000,
    tag: 'Выбирают чаще всего',
    forWhom: 'Для дома до 120 м²',
    features: [
      'Весь дом на резерве — вечер и ночь',
      'Готов к солнечным панелям',
      'Заряжается ночью по дешёвому тарифу',
      'Гарантия 7 лет',
    ],
  },
  {
    id: 'home-15',
    name: 'Volt Home 15',
    capacity: 15,
    power: 8,
    price: 669_000,
    forWhom: 'Для дома с электроотоплением',
    features: [
      'Тянет котёл, насосы и всю технику',
      'Трёхфазное подключение',
      'Работает при −20 °C в неотапливаемом тамбуре',
      'Гарантия 10 лет',
    ],
  },
  {
    id: 'max-20',
    name: 'Volt Max 20',
    capacity: 20,
    power: 10,
    price: 849_000,
    tag: 'Полная автономия',
    forWhom: 'Для жизни вне сети',
    features: [
      'Дом живёт своей энергией сутками',
      'Наращивается до 60 кВт·ч',
      'Управление и статистика в приложении',
      'Гарантия 10 лет',
    ],
  },
]

export type Appliance = {
  id: number
  name: string
  watts: number // Вт
  count: number
  hours: number // часов в сутки
}

export type Preset = { name: string; watts: number; hours: number }

export const PRESETS: Preset[] = [
  { name: 'Холодильник', watts: 150, hours: 8 },
  { name: 'Телевизор', watts: 100, hours: 4 },
  { name: 'Стиральная машина', watts: 2000, hours: 1 },
  { name: 'Чайник', watts: 2000, hours: 0.5 },
  { name: 'Микроволновка', watts: 1000, hours: 0.3 },
  { name: 'Кондиционер', watts: 1200, hours: 5 },
  { name: 'Свет (LED)', watts: 60, hours: 6 },
  { name: 'Компьютер', watts: 300, hours: 6 },
  { name: 'Роутер', watts: 15, hours: 24 },
  { name: 'Насос отопления', watts: 100, hours: 12 },
  { name: 'Бойлер', watts: 1500, hours: 2 },
  { name: 'Электроплита', watts: 3000, hours: 1 },
]

export const DEFAULT_APPLIANCES: Appliance[] = [
  { id: 1, name: 'Холодильник', watts: 150, count: 1, hours: 8 },
  { id: 2, name: 'Свет (LED)', watts: 60, count: 1, hours: 6 },
  { id: 3, name: 'Телевизор', watts: 100, count: 1, hours: 4 },
  { id: 4, name: 'Роутер', watts: 15, count: 1, hours: 24 },
]

export const FAQ = [
  {
    q: 'Это безопасно держать дома?',
    a: 'Да. Мы используем LiFePO4 — самый спокойный тип литиевых батарей: он не горит и не взрывается даже при повреждении. Плюс встроенная система управления следит за температурой и зарядом каждой ячейки.',
  },
  {
    q: 'Сложно ли устанавливать?',
    a: 'Нет, установка занимает 2–4 часа и её делает наш инженер. Накопитель встраивается в ваш электрощит, и дальше всё происходит автоматически — вам ничего настраивать не нужно.',
  },
  {
    q: 'Сколько прослужит батарея?',
    a: 'Ресурс — от 6000 циклов заряда. Даже если гонять накопитель каждый день, это 15+ лет работы. Гарантия — до 10 лет в зависимости от модели.',
  },
  {
    q: 'Не знаю своего потребления — что делать?',
    a: 'Для этого мы сделали калькулятор: отметьте свои приборы — и он посчитает потребление и подскажет модель. А можно просто позвонить, и мы посчитаем вместе.',
  },
]

/* ---------- Утилиты ---------- */

export const fmtPrice = (v: number) => v.toLocaleString('ru-RU') + ' ₽'
export const fmt = (v: number, digits = 1) =>
  v.toLocaleString('ru-RU', { maximumFractionDigits: digits })

/* Склонение: 1 час, 2 часа, 5 часов */
export const plural = (n: number, one: string, few: string, many: string) => {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}
