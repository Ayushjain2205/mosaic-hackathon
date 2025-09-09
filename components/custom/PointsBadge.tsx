"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Star } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PointsBadgeProps {
  points: number
  recentPoints?: number
}

export function PointsBadge({ points, recentPoints = 0 }: PointsBadgeProps) {
  const [showPointsAnimation, setShowPointsAnimation] = useState(false)

  // Calculate level based on points
  const level = Math.floor(points / 100) + 1

  useEffect(() => {
    if (recentPoints > 0) {
      setShowPointsAnimation(true)
      const timer = setTimeout(() => {
        setShowPointsAnimation(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [recentPoints, points])

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 bg-white border-2 border-primary/20 px-3 py-1 rounded-full shadow-sm">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="font-bold text-primary">{points} points</span>
              <div className="flex items-center gap-1 bg-secondary/10 px-2 py-0.5 rounded-full">
                <Star className="h-3 w-3 text-secondary" fill="currentColor" />
                <span className="text-xs font-bold text-secondary">Lv.{level}</span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-sm">
              <p className="font-bold">Level {level}</p>
              <p className="text-xs text-muted-foreground">Next level: {level * 100 - points} points needed</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Points earned animation */}
      <AnimatePresence>
        {showPointsAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: -40 }}
            className="absolute top-0 right-0 bg-secondary text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg"
          >
            +{recentPoints} XP
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

