import React from "react"
import { motion } from "framer-motion"

interface Dot {
  id: number
  top: string
  left: string
  size: number
  color: string
  animationDuration: number
  animationDelay: number
}

const generateDots = (count: number): Dot[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 6 + 4, // Random size between 4px and 10px
    color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`, // Random blue-ish color
    animationDuration: Math.random() * 3 + 2, // Random duration between 2s and 5s
    animationDelay: Math.random() * 2, // Random delay between 0s and 2s
  }))
}

interface FloatingDotsProps {
  count?: number
}

const FloatingDots: React.FC<FloatingDotsProps> = ({ count = 20 }) => {
  const dots = React.useMemo(() => generateDots(count), [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: dot.color,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: dot.animationDuration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: dot.animationDelay,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingDots

