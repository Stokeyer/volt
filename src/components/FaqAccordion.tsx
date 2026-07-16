import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

type Item = { q: string; a: string }

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: Item
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className={`faq-item${open ? ' faq-item-open' : ''}`}>
      <button
        className="faq-question"
        aria-expanded={open}
        onClick={onToggle}
      >
        {item.q}
        <motion.span
          className="faq-icon"
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Plus size={19} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.35, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqAccordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <>
      {items.map((f, i) => (
        <FaqRow
          key={f.q}
          item={f}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </>
  )
}
