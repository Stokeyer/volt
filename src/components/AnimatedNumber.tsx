import { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

/**
 * Число, плавно «докручивающееся» до нового значения при изменении.
 * Формат — русская локаль, как у fmt() в data.ts.
 */
export function AnimatedNumber({
  value,
  digits = 1,
}: {
  value: number
  digits?: number
}) {
  const spring = useSpring(value, { stiffness: 170, damping: 26, mass: 0.6 })

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  const display = useTransform(spring, (v) =>
    v.toLocaleString('ru-RU', { maximumFractionDigits: digits }),
  )

  return <motion.span className="anim-number">{display}</motion.span>
}
