import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching courses:", error);
      return NextResponse.json(
        { error: "Failed to fetch courses" },
        { status: 500 }
      );
    }

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error in courses API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
