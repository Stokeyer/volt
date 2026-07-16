import { motion, type MotionProps } from 'framer-motion'
import type { ComponentProps, ReactNode } from 'react'

/* Появление при загрузке страницы (шапка страницы) */
export const pageEnter: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

/* Появление при прокрутке до элемента */
export const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

/* То же, но с каскадной задержкой по индексу */
export const fadeUpDelayed = (index: number): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.08 },
})

export function PageHead({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<typeof motion.div>) {
  return (
    <motion.div {...pageEnter} {...rest}>
      {children}
    </motion.div>
  )
}

export function Reveal({
  children,
  index = 0,
  className,
  ...rest
}: {
  children: ReactNode
  index?: number
  className?: string
} & ComponentProps<typeof motion.div>) {
  return (
    <motion.div className={className} {...fadeUpDelayed(index)} {...rest}>
      {children}
    </motion.div>
  )
}
