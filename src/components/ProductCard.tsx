import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { PRODUCTS, fmtPrice, type Product } from '../data'

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {p.tag && <span className="product-tag">{p.tag}</span>}
      <div className="product-visual" aria-hidden="true">
        <div className="battery">
          <motion.div
            className="battery-fill"
            initial={{ height: 0 }}
            whileInView={{ height: `${(p.capacity / 20) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.08 }}
          />
        </div>
      </div>
      <span className="product-for">{p.forWhom}</span>
      <h3>{p.name}</h3>
      <div className="product-specs">
        <span>
          <strong>{p.capacity}</strong> кВт·ч
        </span>
        <span>
          <strong>{p.power}</strong> кВт
        </span>
      </div>
      <ul className="product-features">
        {p.features.map((f) => (
          <li key={f}>
            <Check size={15} strokeWidth={2.5} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <div className="product-price">{fmtPrice(p.price)}</div>
      <Link className="btn btn-primary" to="/contact">
        Хочу такой
      </Link>
    </motion.article>
  )
}

export function ProductGrid() {
  return (
    <div className="products-grid">
      {PRODUCTS.map((p, i) => (
        <ProductCard p={p} index={i} key={p.id} />
      ))}
    </div>
  )
}
