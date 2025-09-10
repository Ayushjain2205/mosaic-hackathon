import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Course {
  id: string;
  title: string;
  description: string | null;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  category:
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
  type: "slides" | "video" | "audio";
  creator: string;
  icon: string;
  tags: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseSlide {
  id: string;
  course_id: string;
  slide_number: number;
  title: string;
  content: string;
  created_at: string;
}

export interface CourseSection {
  id: string;
  course_id: string;
  section_number: number;
  title: string;
  content: string;
  key_points: string[];
  audio_url: string | null;
  duration: number | null;
  created_at: string;
}

export interface Quiz {
  id: string;
  course_id: string;
  slide_id: string | null;
  section_id: string | null;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string | null;
  points: number;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  total_points: number;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface UserCourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  current_slide: number;
  current_section: number;
  completed_slides: number[];
  completed_sections: number[];
  is_completed: boolean;
  started_at: string;
  completed_at: string | null;
  last_accessed: string;
}

export interface UserQuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  selected_answer: string;
  is_correct: boolean;
  points_earned: number;
  attempted_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_id: string;
  generated_at: string;
}
