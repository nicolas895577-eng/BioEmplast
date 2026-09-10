import { motion } from "framer-motion"

/**
 * Envuelve cualquier sección para que aparezca con una animación de
 * fade + deslizamiento hacia arriba cuando entra en el viewport al hacer scroll.
 * Se anima una sola vez (no se repite si vuelves a subir).
 */
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as = "section",
}) {
  const offsets = {
    up: { y: 32, x: 0 },
    left: { y: 0, x: 32 },
    right: { y: 0, x: -32 },
    none: { y: 0, x: 0 },
  }
  const { x, y } = offsets[direction] ?? offsets.up

  const Comp = motion[as] ?? motion.section

  return (
    <Comp
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </Comp>
  )
}
