"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function LoadingState() {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("Gathering knowledge...")

  // Simulate progress and change messages
  useEffect(() => {
    const messages = [
      "Gathering knowledge...",
      "Creating fun exercises...",
      "Preparing your personalized course...",
      "Almost ready for learning magic!",
      "Polishing final details...",
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Increase progress by random amount between 5-15%
        const newProgress = Math.min(prev + Math.random() * 10 + 5, 95)

        // Change message based on progress
        const messageIndex = Math.floor((newProgress / 100) * messages.length)
        setMessage(messages[Math.min(messageIndex, messages.length - 1)])

        return newProgress
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-3xl border border-primary/20 bg-white shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Video section - larger and on the left */}
            <div className="w-full md:w-1/2 bg-primary/5 flex items-center justify-center p-6">
              <div className="relative">
                <video
                  className="rounded-xl w-full max-w-[280px] border-4 border-primary/10 shadow-lg"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/studying.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute -bottom-3 right-0 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                  <Sparkles className="h-3 w-3 inline mr-1" />
                  Creating...
                </div>
              </div>
            </div>

            {/* Content section - on the right */}
            <div className="w-full md:w-1/2 p-6">
              <div className="flex flex-col h-full justify-center">
                <h3 className="text-2xl font-bold text-primary mb-2">Miss Nova is working</h3>
                <p className="text-base font-medium text-primary/80 mb-6">{message}</p>

                <div className="w-full mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-primary/10" indicatorClassName="bg-primary" />
                </div>

                <p className="text-sm text-muted-foreground flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-primary/60" />
                  Creating your personalized learning experience
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
