"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Player, type PlayerRef } from "@remotion/player"
import { ContinuousCourseComposition } from "@/components/custom/remotion/ContinuousCourseComposition"
import { CheckCircle, XCircle, HelpCircle, Award, ChevronRight, BookOpen, Star } from "lucide-react"
import { QuizSection } from "@/components/custom/QuizSection"
import { AnimatedMascot } from "@/components/custom/AnimatedMascot"
import { PointsDisplay } from "@/components/custom/PointsDisplay"
import { LeaderboardButton } from "@/components/custom/LeaderboardButton"
import { Certificate } from "@/components/custom/Certificate"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Quiz {
  question: string
  options: string[]
  correct_answer: string
  explanation: string
}

interface CourseSection {
  title: string
  content: string
  key_points: string[]
  quiz: Quiz
  userAnswer?: string
  isCorrect?: boolean
}

interface CourseContent {
  title: string
  description: string
  sections: CourseSection[]
}

// Mock leaderboard data
const mockLeaderboardData = [
  { id: "1", name: "Alex Johnson", points: 1250, rank: 1 },
  { id: "2", name: "Taylor Swift", points: 980, rank: 2 },
  { id: "3", name: "Morgan Freeman", points: 875, rank: 3 },
  { id: "4", name: "Jamie Oliver", points: 720, rank: 4 },
  { id: "5", name: "Emma Watson", points: 690, rank: 5 },
  { id: "6", name: "Chris Evans", points: 645, rank: 6 },
  { id: "7", name: "Zoe Saldana", points: 590, rank: 7 },
  { id: "8", name: "Tom Holland", points: 540, rank: 8 },
  { id: "9", name: "Keanu Reeves", points: 510, rank: 9 },
  { id: "10", name: "Scarlett Johansson", points: 480, rank: 10 },
]

interface LeaderboardEntry {
  id: string
  name: string
  points: number
  rank: number
  isCurrentUser?: boolean
}

// Video player configuration
const VIDEO_CONFIG = {
  fps: 30,
  totalDuration: 1800, // Increased to 2 minutes (30fps * 120 seconds)
  compositionWidth: 1920,
  compositionHeight: 1080,
} as const

export default function VideoCoursePage() {
  const router = useRouter()

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [completedSections, setCompletedSections] = useState<number[]>([])
  const [points, setPoints] = useState(0)
  const [recentPoints, setRecentPoints] = useState(0)
  const [userRank, setUserRank] = useState(11)
  const [showCertificate, setShowCertificate] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    [...mockLeaderboardData, { id: "user", name: "You", points: 0, rank: 11, isCurrentUser: true }]
  )
  const [mascotBubble, setMascotBubble] = useState({
    visible: false,
    isCorrect: false,
    message: "",
  })
  const [courseContent, setCourseContent] = useState<CourseContent>({
    title: "",
    description: "",
    sections: [],
  })

  // Helper functions
  const generateCertificateId = () => {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 8)
    return `${timestamp}-${random}`
  }

  // Refs
  const playerRef = useRef<PlayerRef>(null)

  // Effects
  useEffect(() => {
    const fetchCourseContent = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/mock-video-course')
        const data = await response.json()
        setCourseContent(data)
      } catch (error) {
        console.error('Error fetching course content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourseContent()
  }, [])

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (playerRef.current) {
        setCurrentFrame(playerRef.current.getCurrentFrame())
      }
    }

    const player = playerRef.current
    if (player) {
      player.addEventListener('timeupdate', handleTimeUpdate)
      return () => {
        player.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [playerRef])

  const awardPoints = (amount: number) => {
    setPoints((prev) => prev + amount)
    setRecentPoints(amount)

    // Update leaderboard
    setLeaderboardData((prev) => {
      const updatedData = prev
        .map((entry: LeaderboardEntry) => {
          if (entry.isCurrentUser) {
            return { ...entry, points: entry.points + amount }
          }
          return entry
        })
        .sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.points - a.points)

      // Recalculate ranks and update user rank
      const newData = updatedData.map((entry: LeaderboardEntry, i: number) => ({ ...entry, rank: i + 1 }))
      const userEntry = newData.find((entry: LeaderboardEntry) => entry.isCurrentUser)
      if (userEntry) {
        setUserRank(userEntry.rank)
      }
      return newData
    })
  }

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return

    const currentSection = courseContent.sections[currentSectionIndex]
    const isCorrect = selectedAnswer === currentSection.quiz.correct_answer

    // Update section with user's answer
    const updatedSections = [...courseContent.sections]
    updatedSections[currentSectionIndex] = {
      ...currentSection,
      userAnswer: selectedAnswer,
      isCorrect,
    }

    setCourseContent((prev) => ({
      ...prev,
      sections: updatedSections,
    }))

    // Update completed sections
    if (!completedSections.includes(currentSectionIndex)) {
      setCompletedSections((prev) => [...prev, currentSectionIndex])
    }

    // Show explanation
    setShowExplanation(true)

    // Show mascot feedback
    setMascotBubble({
      visible: true,
      isCorrect,
      message: isCorrect
        ? "Great job! You got it right! 🎉"
        : "Don't worry! Keep learning and try again! 💪",
    })

    // Award points if correct
    if (isCorrect) {
      awardPoints(100)
    }

    // Hide mascot after 3 seconds
    setTimeout(() => {
      setMascotBubble((prev) => ({ ...prev, visible: false }))
    }, 3000)

    // Reset for next question
    setSelectedAnswer(null)
  }

  const jumpToSection = (sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= courseContent.sections.length) return
    setCurrentSectionIndex(sectionIndex)
    setCurrentFrame(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const handleNextSection = () => {
    if (
      currentSectionIndex < courseContent.sections.length - 1 &&
      currentSectionIndex !== undefined
    ) {
      jumpToSection(currentSectionIndex + 1)
    }
  }

  const handlePrevSection = () => {
    if (currentSectionIndex > 0 && currentSectionIndex !== undefined) {
      jumpToSection(currentSectionIndex - 1)
    }
  }

  // Calculate section markers for navigation
  const sectionDuration = 450 // 15 seconds per section at 30fps
  const fps = 30
  const totalDuration = sectionDuration * courseContent.sections.length
  const currentSection = courseContent.sections[currentSectionIndex]
  const progress = ((currentFrame % sectionDuration) / sectionDuration) * 100

  // Calculate progress percentage
  const progressPercentage = ((currentSectionIndex + 1) / courseContent.sections.length) * 100

  // Check if current section is completed
  const isCurrentSectionCompleted = completedSections.includes(currentSectionIndex)

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">

      <div className="space-y-6">
        <Card className="border-2 border-primary/20 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-heading">{courseContent.title}</CardTitle>
                <CardDescription className="text-base mt-2 font-body">{courseContent.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-body">
                  {completedSections.length} / {courseContent.sections.length} completed
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Star className="h-4 w-4 mr-1 text-primary" />
                  <span>{points} points</span>
                </Button>
                <LeaderboardButton entries={leaderboardData} courseTitle={courseContent.title} userRank={userRank} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 md:p-6 space-y-6">


              <Card className="border border-muted rounded-xl overflow-hidden">
                <CardHeader className="bg-muted/30 border-b border-muted">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-heading">{courseContent.sections[currentSectionIndex]?.title || ""}</CardTitle>
                    {completedSections.includes(currentSectionIndex) && (
                      <div className="flex items-center text-secondary">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Video Player */}
                  <div className="aspect-video bg-black">
                    {isLoading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                          <div className="text-primary font-medium">Loading course content...</div>
                        </div>
                      </div>
                    ) : (
                      <Player
                        ref={playerRef}
                        component={ContinuousCourseComposition}
                        inputProps={{
                          courseContent,
                          currentFrame,
                        }}
                        durationInFrames={VIDEO_CONFIG.totalDuration}
                        fps={VIDEO_CONFIG.fps}
                        compositionWidth={VIDEO_CONFIG.compositionWidth}
                        compositionHeight={VIDEO_CONFIG.compositionHeight}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        autoPlay
                        loop={false}
                        controls
                        initialFrame={currentFrame}
                        clickToPlay
                        spaceKeyToPlayOrPause
                        showVolumeControls
                        allowFullscreen
                        doubleClickToFullscreen
                        moveToBeginningWhenEnded
                        acknowledgeRemotionLicense
                      />
                    )}
                  </div>

                  {/* Quiz Section */}
                  {!isLoading && (
                    <div className="p-6 space-y-6 border-t border-primary/10">
                      <div className="space-y-6">
                        <QuizSection
                          question={courseContent.sections[currentSectionIndex]?.quiz.question || ""}
                          options={courseContent.sections[currentSectionIndex]?.quiz.options || []}
                          correctAnswer={courseContent.sections[currentSectionIndex]?.quiz.correct_answer || ""}
                          explanation={courseContent.sections[currentSectionIndex]?.quiz.explanation || ""}
                          userAnswer={courseContent.sections[currentSectionIndex]?.userAnswer}
                          selectedAnswer={selectedAnswer}
                          showExplanation={showExplanation}
                          onAnswerSelect={setSelectedAnswer}
                          onAnswerSubmit={handleAnswerSubmit}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <AnimatedMascot visible={mascotBubble.visible} isCorrect={mascotBubble.isCorrect} />

              <div className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevSection}
                  disabled={currentSectionIndex === 0}
                  className="px-6 btn-playful font-body"
                >
                  Previous
                </Button>
                {currentSectionIndex === courseContent.sections.length - 1 && completedSections.length === courseContent.sections.length ? (
                  <Button
                    onClick={() => setShowCertificate(true)}
                    className="px-6 bg-primary btn-playful font-body"
                  >
                    Complete Course <Award className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextSection}
                    disabled={!courseContent.sections[currentSectionIndex]?.userAnswer && currentSectionIndex !== 0}
                    className="px-6 bg-primary btn-playful font-body"
                  >
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center gap-4">
          {completedSections.length === courseContent.sections.length && (
            <div className="flex items-center gap-2 text-primary font-medium">
              <Award className="h-5 w-5" />
              Course completed! You've earned {points} points
            </div>
          )}
          <Button variant="ghost" className="text-muted-foreground font-body">
            <BookOpen className="h-4 w-4 mr-2" />
            View Course Overview
          </Button>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <Certificate
            userName="You"
            courseTitle={courseContent.title}
            certificateId={generateCertificateId()}
            courseDetails={{
              difficulty: "Intermediate",
              topics: ["AI Learning", "Personalized Education", "Interactive Content"],
              correctAnswers: completedSections.filter(sectionIndex => courseContent.sections[sectionIndex]?.isCorrect).length,
              totalQuestions: courseContent.sections.length
            }}
            onClose={() => {
              setShowCertificate(false)
              // Delay navigation to show the certificate
              setTimeout(() => {
                router.push("/")
              }, 500)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
