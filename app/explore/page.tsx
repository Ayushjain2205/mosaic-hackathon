"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CourseTile } from "@/components/custom/CourseTile";
import { Mascot } from "@/components/custom/Mascot";
import { Search, Filter, Sparkles, TrendingUp, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

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
}

interface Course {
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  completion: number;
  icon: string;
  tags: string[];
  category?:
    | "Technology"
    | "Science"
    | "Business"
    | "Arts"
    | "Health"
    | "Language"
    | "Mathematics"
    | "History"
    | "Lifestyle"
    | "Other";
  slides?: Slide[];
  creator?: string;
  type?: "slides" | "video" | "audio";
}

// Sample course data - in a real app, this would come from an API
const allCourses: Course[] = [
  {
    title: "Introduction to JavaScript",
    difficulty: "Beginner",
    completion: 82,
    icon: "💻",
    creator: "Prof. Alex Chen",
    tags: ["Programming", "Web"],
    category: "Technology",
    type: "slides",
  },
  {
    title: "Climate Change Basics",
    difficulty: "Beginner",
    completion: 76,
    icon: "🌍",
    creator: "Dr. Maya Johnson",
    tags: ["Science", "Environment"],
    category: "Science",
    type: "video",
  },
  {
    title: "Digital Marketing 101",
    difficulty: "Beginner",
    completion: 84,
    icon: "📱",
    creator: "Sarah Williams",
    tags: ["Marketing", "Business"],
    category: "Business",
    type: "slides",
  },
  {
    title: "Introduction to Psychology",
    difficulty: "Beginner",
    completion: 79,
    icon: "🧠",
    creator: "Dr. James Peterson",
    tags: ["Psychology", "Science"],
    category: "Science",
    type: "video",
  },
  {
    title: "Web Design Fundamentals",
    difficulty: "Intermediate",
    completion: 68,
    icon: "🎨",
    creator: "Emma Rodriguez",
    tags: ["Design", "Web"],
    category: "Arts",
    type: "slides",
  },
  {
    title: "Data Science Essentials",
    difficulty: "Intermediate",
    completion: 72,
    icon: "📊",
    creator: "Michael Thompson",
    tags: ["Data", "Programming"],
    category: "Technology",
    type: "video",
  },
  {
    title: "Creative Writing Workshop",
    difficulty: "All Levels",
    completion: 88,
    icon: "✍️",
    creator: "Olivia Parker",
    tags: ["Writing", "Arts"],
    category: "Arts",
    type: "slides",
  },
  {
    title: "Personal Finance Basics",
    difficulty: "Beginner",
    completion: 91,
    icon: "💰",
    creator: "Robert Garcia",
    tags: ["Finance", "Life Skills"],
    category: "Business",
    type: "slides",
  },
  {
    title: "Introduction to Astronomy",
    difficulty: "Beginner",
    completion: 85,
    icon: "🔭",
    creator: "Dr. Samantha Lee",
    tags: ["Space", "Science"],
    category: "Science",
    type: "video",
  },
  {
    title: "Healthy Cooking Fundamentals",
    difficulty: "All Levels",
    completion: 77,
    icon: "🥗",
    creator: "Chef Daniel Kim",
    tags: ["Cooking", "Health"],
    category: "Lifestyle",
    type: "slides",
  },
  {
    title: "Yoga for Beginners",
    difficulty: "Beginner",
    completion: 94,
    icon: "🧘",
    creator: "Sophia Martinez",
    tags: ["Fitness", "Wellness"],
    category: "Health",
    type: "video",
  },
  {
    title: "Photography Basics",
    difficulty: "Beginner",
    completion: 81,
    icon: "📷",
    creator: "David Wilson",
    tags: ["Photography", "Arts"],
    category: "Arts",
    type: "slides",
  },
  {
    title: "React Hooks Audio Course",
    difficulty: "Intermediate",
    completion: 78,
    icon: "🎧",
    creator: "Miss Nova",
    tags: ["Programming", "React", "Audio"],
    category: "Technology",
    type: "audio",
  },
  {
    title: "Meditation & Mindfulness",
    difficulty: "All Levels",
    completion: 92,
    icon: "🧘",
    creator: "Dr. Sarah Chen",
    tags: ["Wellness", "Mindfulness", "Audio"],
    category: "Health",
    type: "audio",
  },
  {
    title: "Language Learning - Spanish",
    difficulty: "Beginner",
    completion: 85,
    icon: "🗣️",
    creator: "Prof. Maria Rodriguez",
    tags: ["Language", "Spanish", "Audio"],
    category: "Language",
    type: "audio",
  },
];

// Mock course data for the "Try" button
const mockCourseData = {
  slides: [
    {
      slide_number: 1,
      title: "Introduction",
      content:
        "## Welcome to this course!\n\nThis is the first slide of your selected course. In a real implementation, this would contain actual course content specific to the topic you selected.",
      quiz: {
        question: "What is the purpose of this course?",
        options: [
          "To teach programming",
          "To provide an overview of the selected topic",
          "To test the platform",
          "None of the above",
        ],
        correct_answer: "To provide an overview of the selected topic",
        explanation:
          "This course is designed to give you a comprehensive overview of the topic you selected.",
      },
    },
    // Additional slides would be here
  ],
};

// Add mock slides data to all courses
allCourses.forEach((course) => {
  course.slides = mockCourseData.slides;
});

// Categories for filtering
const categories = [
  "All",
  "Technology",
  "Science",
  "Business",
  "Arts",
  "Lifestyle",
  "Health",
];

// Difficulty levels for filtering
const difficultyLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search query, category, and difficulty
  useEffect(() => {
    let filtered = allCourses;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== "All Levels") {
      filtered = filtered.filter(
        (course) => course.difficulty === selectedDifficulty
      );
    }

    // Filter by tab
    if (activeTab === "trending") {
      filtered = filtered
        .sort((a, b) => b.completion - a.completion)
        .slice(0, 6);
    } else if (activeTab === "new") {
      // In a real app, you'd sort by date added
      filtered = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 6);
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty, activeTab]);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Hero section */}
        <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-6 md:p-10 mb-8 overflow-hidden">
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <video
                className="rounded-full w-[200px] h-[200px] object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/thinking.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Explore Courses
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-6 font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover personalized courses created by Miss Nova on any topic
              you're curious about.
            </motion.p>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for any topic..."
                className="pl-10 py-6 pr-4 rounded-xl border-2 border-primary/20 bg-white/90 backdrop-blur-sm text-lg shadow-sm font-body"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60 h-5 w-5" />

              <Button
                variant="outline"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </motion.div>

            {/* Filters */}
            {showFilters && (
              <motion.div
                className="mt-4 p-4 bg-white rounded-xl border border-primary/20 shadow-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant={
                            selectedCategory === category
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Difficulty
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {difficultyLevels.map((level) => (
                        <Badge
                          key={level}
                          variant={
                            selectedDifficulty === level ? "default" : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => setSelectedDifficulty(level)}
                        >
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tabs and Course Grid */}
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-white">
                <BookOpen className="h-4 w-4 mr-2" />
                All Courses
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-white"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="new" className="data-[state=active]:bg-white">
                <Sparkles className="h-4 w-4 mr-2" />
                New
              </TabsTrigger>
            </TabsList>

            <div className="text-sm text-muted-foreground">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"} found
            </div>
          </div>

          <TabsContent value="all" className="m-0">
            <CourseGrid courses={filteredCourses} />
          </TabsContent>

          <TabsContent value="trending" className="m-0">
            <CourseGrid courses={filteredCourses} />
          </TabsContent>

          <TabsContent value="new" className="m-0">
            <CourseGrid courses={filteredCourses} />
          </TabsContent>
        </Tabs>

        {/* No results message */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-heading">
              No courses found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto font-body">
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

interface CourseGridProps {
  courses: Course[];
}

function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="h-full"
        >
          <CourseTile
            title={course.title}
            difficulty={course.difficulty}
            completion={course.completion}
            icon={course.icon}
            creator={course.creator}
            category={course.category}
            tags={course.tags}
            slides={course.slides}
            type={course.type}
          />
        </motion.div>
      ))}
    </div>
  );
}
