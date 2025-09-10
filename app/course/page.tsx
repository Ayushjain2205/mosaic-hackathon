"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  CheckCircle,
  HelpCircle,
  Award,
  BookOpen,
  Lock,
  ChevronRight,
  Map,
  Lightbulb,
  Brain,
  Rocket,
  GraduationCap,
  ChevronUp,
  ChevronDown,
  Star,
} from "lucide-react";
import { LoadingState } from "@/components/custom/LoadingState";
import { motion, AnimatePresence } from "framer-motion";
import { PointsDisplay } from "@/components/custom/PointsDisplay";
import { LeaderboardButton } from "@/components/custom/LeaderboardButton";
import { Certificate } from "@/components/custom/Certificate";
import { QuizSection } from "@/components/custom/QuizSection";
import { AnimatedMascot } from "@/components/custom/AnimatedMascot";
// Removed Mascot import as we're using video directly

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
  isCurrentUser?: boolean;
}

interface Quiz {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface Slide {
  slide_number: number;
  title: string;
  content: string;
  quiz: Quiz;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface Course {
  title: string;
  description: string;
  total_slides: number;
  slides: Slide[];
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

export default function CoursePage() {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [completedSlides, setCompletedSlides] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showJourneyMap, setShowJourneyMap] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  const [mascotBubble, setMascotBubble] = useState({
    visible: false,
    isCorrect: false,
    message: "",
  });

  // Gamification state
  const [points, setPoints] = useState(0);
  const [recentPoints, setRecentPoints] = useState(0);
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardEntry[]>(mockLeaderboardData);
  const [userRank, setUserRank] = useState(0);
  const [level, setLevel] = useState(1);
  const [userName, setUserName] = useState("Your Name");
  const [certificateId, setCertificateId] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // First, try to get course data from localStorage
        const storedCourse = localStorage.getItem("currentCourse");
        if (storedCourse) {
          console.log(
            "📚 [COURSE] Using stored course data:",
            JSON.parse(storedCourse)
          );
          setCourse(JSON.parse(storedCourse));
          return;
        }

        // If no stored course, generate a new one with a default prompt
        console.log(
          "🔄 [COURSE] No stored course found, generating new course"
        );
        const response = await fetch("/api/generate-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: "Introduction to Web Development" }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }
        const courseData = await response.json();
        setCourse(courseData);
      } catch (err) {
        setError("Failed to load course data");
        console.error("Error fetching course data:", err);
      }
    };

    fetchCourse();

    // Initialize user in leaderboard
    const userPoints = Math.floor(Math.random() * 300) + 400; // Random starting points
    const userRank =
      leaderboardData.findIndex((entry) => entry.points < userPoints) + 1;

    setLeaderboardData((prev) =>
      [
        ...prev.slice(0, userRank - 1),
        {
          id: "user",
          name: "You",
          points: userPoints,
          isCurrentUser: true,
          rank: userRank,
        },
        ...prev.slice(userRank - 1),
      ].map((entry, i) => ({ ...entry, rank: i + 1 }))
    );

    setPoints(userPoints);
    setUserRank(userRank);
    setLevel(Math.floor(userPoints / 100) + 1);

    // Generate a random certificate ID
    setCertificateId(generateCertificateId());

    // For demo purposes, set a name
    setUserName("Your Name");

    setIsLoading(false);
  }, []);

  // Update level when points change
  useEffect(() => {
    const newLevel = Math.floor(points / 100) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
    }
  }, [points, level]);

  const generateCertificateId = () => {
    return (
      "cert-" +
      Math.random().toString(36).substring(2, 10) +
      "-" +
      Math.random().toString(36).substring(2, 6) +
      "-" +
      Date.now().toString(36)
    );
  };

  const awardPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
    setRecentPoints(amount);

    // Update leaderboard
    setLeaderboardData((prev) => {
      const updatedData = prev
        .map((entry) => {
          if (entry.isCurrentUser) {
            return { ...entry, points: entry.points + amount };
          }
          return entry;
        })
        .sort((a, b) => b.points - a.points);

      // Recalculate ranks and update user rank
      const newData = updatedData.map((entry, i) => ({
        ...entry,
        rank: i + 1,
      }));
      const newUserRank = newData.findIndex((entry) => entry.isCurrentUser) + 1;
      setUserRank(newUserRank);

      return newData;
    });
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer || !course) return;

    const currentQuiz = course.slides[currentSlideIndex].quiz;
    const isCorrect = selectedAnswer === currentQuiz.correct_answer;

    // Store the answer and correctness in the course data
    const updatedCourse = { ...course };
    updatedCourse.slides[currentSlideIndex].userAnswer = selectedAnswer;
    updatedCourse.slides[currentSlideIndex].isCorrect = isCorrect;
    setCourse(updatedCourse);

    if (isCorrect) {
      // Award points for correct answer
      awardPoints(25);

      // Add slide to completed slides if not already completed
      if (!completedSlides.includes(currentSlideIndex)) {
        setCompletedSlides([...completedSlides, currentSlideIndex]);
        // Award additional points for completing new slide
        awardPoints(10);
      }
    }

    // Show explanation
    setShowExplanation(true);

    // Update mascot bubble
    setMascotBubble({
      visible: true,
      isCorrect: isCorrect,
      message: isCorrect
        ? "Great job! That's correct! 🎉"
        : "Don't worry! Learning from mistakes makes us stronger! 💪",
    });

    // Hide mascot bubble after 3 seconds
    setTimeout(() => {
      setMascotBubble((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!course) return;

    // Scroll to top of the content
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (currentSlideIndex < course.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }

    // Mark current slide as completed and award points
    if (!completedSlides.includes(currentSlideIndex)) {
      setCompletedSlides([...completedSlides, currentSlideIndex]);
      awardPoints(10);
    }

    // Reset mascot bubble
    setMascotBubble({
      visible: false,
      isCorrect: false,
      message: "",
    });
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      window.scrollTo(0, 0);
    }
  };

  const getNodeStatus = (index: number) => {
    if (completedSlides.includes(index)) {
      return "completed";
    } else if (index === currentSlideIndex) {
      return "current";
    } else if (index === 0 || completedSlides.includes(index - 1)) {
      return "available";
    } else {
      return "locked";
    }
  };

  const handleNodeClick = (index: number) => {
    // Only allow clicking on completed slides or the next available slide
    if (
      completedSlides.includes(index) ||
      index === 0 ||
      completedSlides.includes(index - 1)
    ) {
      setCurrentSlideIndex(index);
      setSelectedAnswer(null);
      setShowExplanation(false);
      window.scrollTo(0, 0);
    }
  };

  // Icons for journey map nodes
  const nodeIcons = [
    <Lightbulb key="lightbulb" className="h-5 w-5" />,
    <Brain key="brain" className="h-5 w-5" />,
    <BookOpen key="book" className="h-5 w-5" />,
    <Rocket key="rocket" className="h-5 w-5" />,
    <GraduationCap key="graduation" className="h-5 w-5" />,
  ];

  const handleCompleteCourse = () => {
    // Award bonus points for completing the course
    awardPoints(100);

    // Show certificate
    setShowCertificate(true);
  };

  if (isLoading) return <LoadingState />;

  if (error) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-2xl font-bold text-destructive font-heading">
          Oops!
        </h2>
        <p className="text-lg font-body">{error}</p>
        <Button
          onClick={() => router.push("/")}
          className="mt-4 btn-playful font-body"
        >
          Go Home
        </Button>
      </div>
    );
  }

  if (!course) return null;

  return (
    <main className="container max-w-7xl mx-auto p-4 md:p-6 min-h-screen relative">
      {/* Mascot Bubble */}
      <AnimatePresence mode="wait">
        {mascotBubble.visible && (
          <motion.div
            className="fixed z-50"
            initial={{ opacity: 0, scale: 0.5, left: "2rem", bottom: "-4rem" }}
            animate={{
              opacity: 1,
              scale: 1,
              left: ["2rem", "4rem", "2rem", "4rem"],
              bottom: "100vh",
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 4,
              ease: "easeOut",
              left: {
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <AnimatedMascot
              visible={mascotBubble.visible}
              isCorrect={mascotBubble.isCorrect}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Points Display */}
        <div className="mb-6">
          <PointsDisplay
            points={points}
            level={level}
            recentPoints={recentPoints}
          />
        </div>

        {/* Course Header with Integrated Journey Map */}
        <Card className="border-2 border-primary/20 shadow-lg rounded-2xl overflow-hidden mb-8">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-heading">
                  {course?.title}
                </CardTitle>
                <CardDescription className="text-base mt-2 font-body">
                  {course?.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-body">
                  {completedSlides.length} / {course?.total_slides} completed
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
                  courseTitle={course?.title ?? ""}
                  userRank={userRank}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center p-2"
                  onClick={() => setShowJourneyMap(!showJourneyMap)}
                >
                  <Map className="h-4 w-4 mr-1" />
                  {showJourneyMap ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Integrated Journey Map */}
          <AnimatePresence>
            {showJourneyMap && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
                  <div className="relative" style={{ height: "140px" }}>
                    {/* Decorative elements */}
                    <div className="absolute w-full h-full">
                      <div className="absolute top-1/4 left-1/6 w-8 h-8 text-blue-200 opacity-20">
                        <BookOpen className="w-full h-full" />
                      </div>
                      <div className="absolute bottom-1/3 right-1/4 w-10 h-10 text-green-200 opacity-20">
                        <Brain className="w-full h-full" />
                      </div>
                      <div className="absolute top-1/2 left-2/3 w-12 h-12 text-yellow-200 opacity-20">
                        <Lightbulb className="w-full h-full" />
                      </div>
                    </div>

                    {/* Journey Map - Fixed Alignment */}
                    <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
                      {/* Background track */}
                      <div className="h-2 bg-gray-200 rounded-full mx-10 relative">
                        {/* Colored progress track - ensure it goes fully behind nodes */}
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                          style={{
                            width: `${
                              (currentSlideIndex / (course.slides.length - 1)) *
                              100
                            }%`,
                            zIndex: 0,
                          }}
                        ></div>

                        {/* Nodes - positioned with higher z-index to appear above the line */}
                        <div className="absolute inset-0" style={{ zIndex: 1 }}>
                          {course.slides.map((slide, index) => {
                            const position = `${
                              (index / (course.slides.length - 1)) * 100
                            }%`;
                            const nodeStatus = getNodeStatus(index);

                            return (
                              <div
                                key={index}
                                className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                style={{ left: position }}
                              >
                                {/* Node */}
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  onClick={() => handleNodeClick(index)}
                                  className={`relative cursor-pointer ${
                                    nodeStatus === "locked"
                                      ? "cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  {/* Node circle */}
                                  <div
                                    className={`flex items-center justify-center rounded-full w-10 h-10 text-white shadow-md
                                      ${
                                        nodeStatus === "completed"
                                          ? "bg-secondary"
                                          : nodeStatus === "current"
                                          ? "bg-primary ring-4 ring-primary/30"
                                          : nodeStatus === "available"
                                          ? "bg-primary"
                                          : "bg-gray-300"
                                      }`}
                                    style={{
                                      boxShadow:
                                        currentSlideIndex === index
                                          ? "0 0 0 2px hsl(var(--primary)), 0 2px 4px rgba(0,0,0,0.1)"
                                          : "",
                                    }}
                                  >
                                    {nodeStatus === "completed" ? (
                                      <CheckCircle className="h-5 w-5" />
                                    ) : nodeStatus === "locked" ? (
                                      <Lock className="h-4 w-4" />
                                    ) : (
                                      nodeIcons[index % nodeIcons.length]
                                    )}
                                  </div>

                                  {/* Node label */}
                                  <div
                                    className={`absolute top-12 w-24 text-center left-1/2 transform -translate-x-1/2
                                    ${
                                      nodeStatus === "locked"
                                        ? "text-gray-400"
                                        : currentSlideIndex === index
                                        ? "text-primary font-bold"
                                        : "text-primary"
                                    } font-body`}
                                  >
                                    <span className="text-xs">
                                      {slide.title.length > 12
                                        ? slide.title.substring(0, 12) + "..."
                                        : slide.title}
                                    </span>
                                  </div>
                                </motion.div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <div>
          {/* Current Slide Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-primary/20 shadow-lg rounded-2xl overflow-hidden mb-8">
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          {nodeIcons[currentSlideIndex % nodeIcons.length]}
                        </div>
                        <CardTitle className="text-2xl font-heading">
                          {course.slides[currentSlideIndex].title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base mt-2 font-body">
                        Slide {currentSlideIndex + 1} of {course.slides.length}
                      </CardDescription>
                    </div>
                    {completedSlides.includes(currentSlideIndex) && (
                      <div className="flex items-center text-secondary font-body">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span className="text-sm">Completed</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="prose max-w-none dark:prose-invert mb-10 font-body">
                    <ReactMarkdown>
                      {course.slides[currentSlideIndex].content}
                    </ReactMarkdown>
                  </div>

                  <QuizSection
                    question={
                      course?.slides[currentSlideIndex].quiz.question ?? ""
                    }
                    options={
                      course?.slides[currentSlideIndex].quiz.options ?? []
                    }
                    correctAnswer={
                      course?.slides[currentSlideIndex].quiz.correct_answer ??
                      ""
                    }
                    explanation={
                      course?.slides[currentSlideIndex].quiz.explanation ?? ""
                    }
                    userAnswer={course?.slides[currentSlideIndex].userAnswer}
                    selectedAnswer={selectedAnswer}
                    showExplanation={showExplanation}
                    onAnswerSelect={setSelectedAnswer}
                    onAnswerSubmit={handleAnswerSubmit}
                  />
                </CardContent>

                <CardFooter className="border-t border-primary/10 p-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={handlePrevSlide}
                      disabled={currentSlideIndex === 0}
                      className="btn-playful font-body"
                    >
                      Previous
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground font-body"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold font-heading">
                            How to use this course
                          </h4>
                          <p className="text-sm font-body">
                            Read through each slide's content, then test your
                            knowledge with the quiz below. You must answer
                            correctly to mark a slide as complete and unlock the
                            next one.
                          </p>
                          <p className="text-sm font-body mt-2">
                            <span className="font-bold">Earn points:</span>
                            <ul className="list-disc pl-5 mt-1">
                              <li>+25 points for correct quiz answers</li>
                              <li>+10 points for completing new slides</li>
                              <li>
                                +100 points bonus for finishing the course
                              </li>
                            </ul>
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  {currentSlideIndex < (course?.slides.length ?? 0) - 1 ? (
                    <Button
                      onClick={handleNextSlide}
                      disabled={!course?.slides[currentSlideIndex]?.userAnswer}
                      className="btn-playful font-body"
                    >
                      Next <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleCompleteCourse}
                      disabled={!course?.slides[currentSlideIndex]?.userAnswer}
                      className="btn-playful font-body"
                    >
                      Complete Course <Award className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <Certificate
            userName={userName}
            courseTitle={course?.title ?? ""}
            certificateId={certificateId}
            courseDetails={{
              difficulty: "Intermediate",
              topics: [
                "AI Learning",
                "Personalized Education",
                "Interactive Content",
              ],
              correctAnswers: completedSlides.filter(
                (slideIndex) => course?.slides[slideIndex]?.isCorrect
              ).length,
              totalQuestions: course?.slides.length ?? 0,
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
    </main>
  );
}
