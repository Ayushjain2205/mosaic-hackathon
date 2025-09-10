import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: courseId } = await params;

    // Fetch course details
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single();

    if (courseError) {
      console.error("Error fetching course:", courseError);
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Fetch course content based on type
    let content = null;
    if (course.type === "slides") {
      const { data: slides, error: slidesError } = await supabase
        .from("course_slides")
        .select("*")
        .eq("course_id", courseId)
        .order("slide_number");

      if (slidesError) {
        console.error("Error fetching slides:", slidesError);
        return NextResponse.json(
          { error: "Failed to fetch course content" },
          { status: 500 }
        );
      }

      content = {
        total_slides: slides.length,
        slides: slides,
      };
    } else if (course.type === "video" || course.type === "audio") {
      const { data: sections, error: sectionsError } = await supabase
        .from("course_sections")
        .select("*")
        .eq("course_id", courseId)
        .order("section_number");

      if (sectionsError) {
        console.error("Error fetching sections:", sectionsError);
        return NextResponse.json(
          { error: "Failed to fetch course content" },
          { status: 500 }
        );
      }

      content = {
        sections: sections,
      };
    }

    // Fetch quizzes for the course
    const { data: quizzes, error: quizzesError } = await supabase
      .from("quizzes")
      .select("*")
      .eq("course_id", courseId);

    if (quizzesError) {
      console.error("Error fetching quizzes:", quizzesError);
      return NextResponse.json(
        { error: "Failed to fetch quizzes" },
        { status: 500 }
      );
    }

    // Attach quizzes to their respective content
    if (content) {
      if (course.type === "slides" && content.slides) {
        content.slides = content.slides.map((slide: any) => {
          const quiz = quizzes.find((q) => q.slide_id === slide.id);
          return {
            ...slide,
            quiz: quiz
              ? {
                  question: quiz.question,
                  options: quiz.options,
                  correct_answer: quiz.correct_answer,
                  explanation: quiz.explanation,
                }
              : null,
          };
        });
      } else if (
        (course.type === "video" || course.type === "audio") &&
        content.sections
      ) {
        content.sections = content.sections.map((section: any) => {
          const quiz = quizzes.find((q) => q.section_id === section.id);
          return {
            ...section,
            quiz: quiz
              ? {
                  question: quiz.question,
                  options: quiz.options,
                  correct_answer: quiz.correct_answer,
                  explanation: quiz.explanation,
                }
              : null,
          };
        });
      }
    }

    // Transform the data to match the expected format
    const responseData = {
      ...course,
      ...content,
    };

    // For slides courses, ensure the data structure matches what the course page expects
    if (course.type === "slides" && content && content.slides) {
      responseData.total_slides = content.slides.length;
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in course API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
