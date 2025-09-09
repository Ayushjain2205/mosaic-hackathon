"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"

export function ConfettiEffect() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 2000)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [])

  if (!showConfetti) return null

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={100}
      gravity={0.3}
      colors={["#3B82F6", "#10B981", "#F59E0B"]}
    />
  )
}

