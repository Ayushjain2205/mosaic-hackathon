"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { AudioVisualizer } from "@/components/custom/AudioVisualizer";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  Award,
  ChevronRight,
  BookOpen,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { QuizSection } from "@/components/custom/QuizSection";
import { AnimatedMascot } from "@/components/custom/AnimatedMascot";
import { PointsDisplay } from "@/components/custom/PointsDisplay";
import { LeaderboardButton } from "@/components/custom/LeaderboardButton";
import { Certificate } from "@/components/custom/Certificate";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Quiz {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface CourseSection {
  title: string;
  content: string;
  key_points: string[];
  quiz: Quiz;
  userAnswer?: string;
  isCorrect?: boolean;
  audioUrl?: string;
  duration?: number;
}

interface CourseContent {
  title: string;
  description: string;
  sections: CourseSection[];
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
];

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
  isCurrentUser?: boolean;
}

export default function AudioCoursePage() {
  const router = useRouter();

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [points, setPoints] = useState(0);
  const [recentPoints, setRecentPoints] = useState(0);
  const [userRank, setUserRank] = useState(11);
  const [showCertificate, setShowCertificate] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([
    ...mockLeaderboardData,
    { id: "user", name: "You", points: 0, rank: 11, isCurrentUser: true },
  ]);
  const [mascotBubble, setMascotBubble] = useState({
    visible: false,
    isCorrect: false,
    message: "",
  });
  const [courseContent, setCourseContent] = useState<CourseContent>({
    title: "",
    description: "",
    sections: [],
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  // Helper functions
  const generateCertificateId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`;
  };

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);

  // Effects
  useEffect(() => {
    const fetchCourseContent = async () => {
      setIsLoading(true);
      try {
        // First, try to get course data from localStorage
        const storedCourse = localStorage.getItem("currentCourse");
        if (storedCourse) {
          console.log(
            "🎧 [AUDIO-COURSE] Using stored course data:",
            JSON.parse(storedCourse)
          );
          setCourseContent(JSON.parse(storedCourse));
          setIsLoading(false);
          return;
        }

        // If no stored course, generate a new one with a default prompt
        console.log(
          "🔄 [AUDIO-COURSE] No stored course found, generating new audio course"
        );
        const response = await fetch("/api/generate-audio-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: "Introduction to Web Development" }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }
        const data = await response.json();
        setCourseContent(data);
      } catch (error) {
        console.error("Error fetching course content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseContent();
  }, []);

  // Handle time updates from audio visualizer
  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const awardPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
    setRecentPoints(amount);

    // Update leaderboard
    setLeaderboardData((prev) => {
      const updatedData = prev
        .map((entry: LeaderboardEntry) => {
          if (entry.isCurrentUser) {
            return { ...entry, points: entry.points + amount };
          }
          return entry;
        })
        .sort(
          (a: LeaderboardEntry, b: LeaderboardEntry) => b.points - a.points
        );

      // Recalculate ranks and update user rank
      const newData = updatedData.map((entry: LeaderboardEntry, i: number) => ({
        ...entry,
        rank: i + 1,
      }));
      const userEntry = newData.find(
        (entry: LeaderboardEntry) => entry.isCurrentUser
      );
      if (userEntry) {
        setUserRank(userEntry.rank);
      }
      return newData;
    });
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    const currentSection = courseContent.sections[currentSectionIndex];
    const isCorrect = selectedAnswer === currentSection.quiz.correct_answer;

    // Update section with user's answer
    const updatedSections = [...courseContent.sections];
    updatedSections[currentSectionIndex] = {
      ...currentSection,
      userAnswer: selectedAnswer,
      isCorrect,
    };

    setCourseContent((prev) => ({
      ...prev,
      sections: updatedSections,
    }));

    // Update completed sections
    if (!completedSections.includes(currentSectionIndex)) {
      setCompletedSections((prev) => [...prev, currentSectionIndex]);
    }

    // Show explanation
    setShowExplanation(true);

    // Show mascot feedback
    setMascotBubble({
      visible: true,
      isCorrect,
      message: isCorrect
        ? "Great job! You got it right! 🎉"
        : "Don't worry! Keep learning and try again! 💪",
    });

    // Award points if correct
    if (isCorrect) {
      awardPoints(100);
    }

    // Hide mascot after 3 seconds
    setTimeout(() => {
      setMascotBubble((prev) => ({ ...prev, visible: false }));
    }, 3000);

    // Reset for next question
    setSelectedAnswer(null);
  };

  const jumpToSection = (sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= courseContent.sections.length)
      return;
    setCurrentSectionIndex(sectionIndex);
    setCurrentTime(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleNextSection = () => {
    if (
      currentSectionIndex < courseContent.sections.length - 1 &&
      currentSectionIndex !== undefined
    ) {
      jumpToSection(currentSectionIndex + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0 && currentSectionIndex !== undefined) {
      jumpToSection(currentSectionIndex - 1);
    }
  };

  const handlePlayPause = (playing: boolean) => {
    setIsPlaying(playing);
  };

  const handleMute = (muted: boolean) => {
    setIsMuted(muted);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const currentSection = courseContent.sections[currentSectionIndex];
  const progress = currentSection?.duration
    ? (currentTime / currentSection.duration) * 100
    : 0;

  // Calculate progress percentage
  const progressPercentage =
    ((currentSectionIndex + 1) / courseContent.sections.length) * 100;

  // Check if current section is completed
  const isCurrentSectionCompleted =
    completedSections.includes(currentSectionIndex);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="space-y-6">
        <Card className="border-2 border-primary/20 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-heading">
                  {courseContent.title}
                </CardTitle>
                <CardDescription className="text-base mt-2 font-body">
                  {courseContent.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-body">
                  {completedSections.length} / {courseContent.sections.length}{" "}
                  completed
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Star className="h-4 w-4 mr-1 text-primary" />
                  <span>{points} points</span>
                </Button>
                <LeaderboardButton
                  entries={leaderboardData}
                  courseTitle={courseContent.title}
                  userRank={userRank}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 md:p-6 space-y-6">
              <Card className="border border-muted rounded-xl overflow-hidden">
                <CardHeader className="bg-muted/30 border-b border-muted">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-heading">
                      {courseContent.sections[currentSectionIndex]?.title || ""}
                    </CardTitle>
                    {completedSections.includes(currentSectionIndex) && (
                      <div className="flex items-center text-secondary">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Audio Visualizer */}
                  <div className="w-full">
                    {isLoading ? (
                      <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                        <div className="flex flex-col items-center gap-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                          <div className="text-primary font-medium">
                            Loading audio content...
                          </div>
                        </div>
                      </div>
                    ) : (
                      <AudioVisualizer
                        audioUrl={currentSection?.audioUrl || "/test-audio.mp3"}
                        title={currentSection?.title || ""}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                        onTimeUpdate={handleTimeUpdate}
                        onVolumeChange={handleVolumeChange}
                        onMute={handleMute}
                        className="w-full"
                      />
                    )}
                  </div>

                  {/* Quiz Section */}
                  {!isLoading && (
                    <div className="p-6 space-y-6 border-t border-primary/10">
                      <div className="space-y-6">
                        <QuizSection
                          question={
                            courseContent.sections[currentSectionIndex]?.quiz
                              .question || ""
                          }
                          options={
                            courseContent.sections[currentSectionIndex]?.quiz
                              .options || []
                          }
                          correctAnswer={
                            courseContent.sections[currentSectionIndex]?.quiz
                              .correct_answer || ""
                          }
                          explanation={
                            courseContent.sections[currentSectionIndex]?.quiz
                              .explanation || ""
                          }
                          userAnswer={
                            courseContent.sections[currentSectionIndex]
                              ?.userAnswer
                          }
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

              <AnimatedMascot
                visible={mascotBubble.visible}
                isCorrect={mascotBubble.isCorrect}
              />

              <div className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevSection}
                  disabled={currentSectionIndex === 0}
                  className="px-6 btn-playful font-body"
                >
                  Previous
                </Button>
                {currentSectionIndex === courseContent.sections.length - 1 &&
                completedSections.length === courseContent.sections.length ? (
                  <Button
                    onClick={() => setShowCertificate(true)}
                    className="px-6 bg-primary btn-playful font-body"
                  >
                    Complete Course <Award className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextSection}
                    disabled={
                      !courseContent.sections[currentSectionIndex]
                        ?.userAnswer && currentSectionIndex !== 0
                    }
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
              topics: [
                "AI Learning",
                "Personalized Education",
                "Interactive Content",
              ],
              correctAnswers: completedSections.filter(
                (sectionIndex) =>
                  courseContent.sections[sectionIndex]?.isCorrect
              ).length,
              totalQuestions: courseContent.sections.length,
            }}
            onClose={() => {
              setShowCertificate(false);
              // Delay navigation to show the certificate
              setTimeout(() => {
                router.push("/");
              }, 500);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
