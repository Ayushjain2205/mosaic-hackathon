"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface AnimatedMascotProps {
  visible: boolean
  isCorrect: boolean
}

export function AnimatedMascot({ visible, isCorrect }: AnimatedMascotProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    if (visible) {
      setShouldRender(true)
      setAnimationKey(prev => prev + 1)
    }
  }, [visible])

  const handleAnimationComplete = () => {
    if (!visible) {
      setShouldRender(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {shouldRender && (
        <motion.div
          key={`mascot-${animationKey}`}
          initial={{ opacity: 0, y: 100, x: 32 }}
          animate={{
            opacity: [0, 1, 1, 1, 0.8, 0],
            y: [100, 0, 0, -200, -400],
            x: [32, 48, 32, 48, 32]
          }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
            times: [0, 0.2, 0.6, 0.7, 0.9, 1]
          }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed bottom-0 left-8 z-50"
        >
          <div className="w-48 h-48 rounded-full overflow-hidden bg-white/30 backdrop-blur-md border-2 border-white/40 shadow-lg">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
              style={{ transform: "scale(1)" }}
            >
              <source src={isCorrect ? "/videos/happy.mp4" : "/videos/sad.mp4"} type="video/mp4" />
            </video>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
