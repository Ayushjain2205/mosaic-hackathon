"use client"

import { useState, useEffect } from "react"

interface PointsDisplayProps {
  points: number
  level: number
  recentPoints?: number
}

export function PointsDisplay({ points, level, recentPoints = 0 }: PointsDisplayProps) {
  const [showPointsAnimation, setShowPointsAnimation] = useState(false)

  useEffect(() => {
    if (recentPoints > 0) {
      setShowPointsAnimation(true)
      const timer = setTimeout(() => {
        setShowPointsAnimation(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [recentPoints, points])

  // Calculate progress to next level (each level requires level * 100 points)
  const nextLevelPoints = (level + 1) * 100
  const currentLevelPoints = level * 100
  const progressToNextLevel = ((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100

  return null
}

