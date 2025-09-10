"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";

export type DifficultyType =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "All Levels";
export type CategoryType =
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
export type CourseType = "slides" | "video" | "audio";

// Difficulty levels with emojis
const difficultyEmojis: Record<DifficultyType, string> = {
  Beginner: "🌱",
  Intermediate: "🌿",
  Advanced: "🌳",
  "All Levels": "🌎",
};

// Categories with emojis
const categoryEmojis: Record<CategoryType, string> = {
  Technology: "💻",
  Science: "🔬",
  Business: "📊",
  Arts: "🎨",
  Health: "🧘",
  Language: "🗣️",
  Mathematics: "🔢",
  History: "📜",
  Lifestyle: "🏡",
  Other: "✨",
};

// Course type emojis
const typeEmojis: Record<CourseType, string> = {
  slides: "📑",
  video: "🎬",
  audio: "🎧",
};

interface CourseTileProps {
  title: string;
  difficulty: DifficultyType;
  completion: number;
  icon: string;
  creator?: string;
  category?: CategoryType;
  tags?: string[];
  slides?: any[]; // Using any for simplicity, but should match your slide structure
  type?: CourseType;
  courseId?: string; // Add course ID for database fetching
}

export function CourseTile({
  title,
  difficulty,
  completion,
  icon,
  creator = "Miss Nova",
  category,
  tags = [],
  slides = [],
  type = "slides", // Default to slides if not specified
  courseId,
}: CourseTileProps) {
  const router = useRouter();

  const handleCourseSelect = async () => {
    if (courseId) {
      try {
        // Fetch the full course data from the database
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }

        const courseData = await response.json();

        // Store the selected course in localStorage
        localStorage.setItem("currentCourse", JSON.stringify(courseData));

        // Route to the appropriate page based on course type
        if (type === "video") {
          router.push("/video-course");
        } else if (type === "audio") {
          router.push("/audio-course");
        } else {
          router.push("/course");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        // Fallback to basic course data
        const selectedCourse = {
          title,
          description: `A comprehensive guide to ${title}`,
          total_slides: slides.length,
          slides,
          type,
        };
        localStorage.setItem("currentCourse", JSON.stringify(selectedCourse));

        if (type === "video") {
          router.push("/video-course");
        } else if (type === "audio") {
          router.push("/audio-course");
        } else {
          router.push("/course");
        }
      }
    } else if (slides.length > 0) {
      // Fallback for courses without courseId
      const selectedCourse = {
        title,
        description: `A comprehensive guide to ${title}`,
        total_slides: slides.length,
        slides,
        type,
      };
      localStorage.setItem("currentCourse", JSON.stringify(selectedCourse));

      if (type === "video") {
        router.push("/video-course");
      } else if (type === "audio") {
        router.push("/audio-course");
      } else {
        router.push("/course");
      }
    }
  };

  // Get the emoji for the difficulty level
  const difficultyEmoji = difficultyEmojis[difficulty];

  // Get the emoji for the category if available
  const categoryEmoji = category ? categoryEmojis[category] : "";

  // Get the emoji for the course type
  const typeEmoji = typeEmojis[type] || typeEmojis.slides;

  return (
    <Card
      className="border border-primary/10 rounded-xl overflow-hidden h-full cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative"
      onClick={handleCourseSelect}
    >
      <div className="p-5 flex flex-col h-[180px]">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-primary font-heading">
            {title}
          </h3>
          <span className="text-2xl">{categoryEmoji || icon}</span>
        </div>

        {category && (
          <div className="flex flex-wrap gap-1 mb-2">
            <span className="text-xs bg-primary/5 border border-primary/20 text-primary px-2 py-0.5 rounded-full">
              {category}
            </span>
          </div>
        )}

        <div className="flex items-center text-muted-foreground text-xs mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          {creator}
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center justify-between pt-3 border-t border-primary/10 mt-auto">
          <div className="flex items-center text-muted-foreground text-xs gap-2">
            <span>
              {difficultyEmoji} {difficulty}
            </span>
            {/* Add the course type emoji here */}
            <span className="text-xs opacity-70">{typeEmoji}</span>
          </div>
          <div className="flex items-center text-secondary text-xs">
            <Star className="h-3 w-3 mr-1" fill="currentColor" />
            <span>{completion}%</span>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-95">
        <div className="text-white font-medium flex flex-col items-center gap-2">
          <span className="text-lg font-bold">Try Course</span>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Card>
  );
}
