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
import { Course } from "@/lib/supabase";

// Course interface is now imported from lib/supabase

// Course data will be fetched from the database

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
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const courses = await response.json();
        setAllCourses(courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 6);
    } else if (activeTab === "new") {
      // Sort by creation date for new courses
      filtered = [...filtered]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 6);
    }

    setFilteredCourses(filtered);
  }, [
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    activeTab,
    allCourses,
  ]);

  // Show loading state
  if (isLoading) {
    return (
      <main className="min-h-screen p-4 md:p-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <div className="text-primary font-medium">Loading courses...</div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Show error state
  if (error) {
    return (
      <main className="min-h-screen p-4 md:p-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
              <Search className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-heading text-destructive">
              Error Loading Courses
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto font-body mb-4">
              {error}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="btn-playful font-body"
            >
              Try Again
            </Button>
          </div>
        </div>
      </main>
    );
  }

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
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="h-full"
        >
          <CourseTile
            title={course.title}
            difficulty={course.difficulty}
            completion={75} // Default completion percentage for now
            icon={course.icon}
            creator={course.creator}
            category={course.category}
            tags={course.tags}
            slides={[]} // Will be loaded when course is selected
            type={course.type}
            courseId={course.id}
          />
        </motion.div>
      ))}
    </div>
  );
}
