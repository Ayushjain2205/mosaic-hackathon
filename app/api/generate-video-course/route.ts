import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the Zod schema for type-safe video course generation
const videoCourseSchema = z.object({
  title: z.string().describe("The video course title"),
  description: z.string().describe("Brief video course description"),
  total_sections: z
    .number()
    .describe("Total number of video sections (should be 5)"),
  sections: z.array(
    z.object({
      section_number: z.number().describe("The section number"),
      title: z.string().describe("The section title"),
      content: z
        .string()
        .describe(
          "Detailed content for the video section with examples and explanations"
        ),
      key_points: z
        .array(z.string())
        .describe("Key points to highlight in the video"),
      quiz: z.object({
        question: z.string().describe("The quiz question"),
        options: z.array(z.string()).length(4).describe("Four answer options"),
        correct_answer: z.string().describe("The correct answer"),
        explanation: z
          .string()
          .describe("Explanation of why this is the correct answer"),
      }),
    })
  ),
});

export async function POST(req: Request) {
  console.log("🎬 [GENERATE-VIDEO-COURSE] API called");

  try {
    const body = await req.json();
    console.log(
      "📥 [GENERATE-VIDEO-COURSE] Request body:",
      JSON.stringify(body, null, 2)
    );

    const { prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      console.log("❌ [GENERATE-VIDEO-COURSE] Invalid prompt:", prompt);
      return NextResponse.json(
        { error: "Valid prompt is required" },
        { status: 400 }
      );
    }

    console.log("✅ [GENERATE-VIDEO-COURSE] Valid prompt received:", prompt);
    console.log("🔍 [GENERATE-VIDEO-COURSE] Prompt type:", typeof prompt);
    console.log("🔍 [GENERATE-VIDEO-COURSE] Prompt length:", prompt.length);

    const systemPrompt = `You are Miss Nova, an expert AI teacher who creates engaging video courses on any topic.
    
    Create a structured video course based on the user's topic. The course should include:
    1. A descriptive title and overview
    2. 5 video sections, each with:
       - A clear title that works well for video content
       - Detailed content that can be presented in video format
       - Key points that can be highlighted visually
       - A quiz question with 4 options, the correct answer, and an explanation
    
    Make the content engaging and suitable for video presentation. Focus on:
    - Visual storytelling elements
    - Step-by-step explanations that work well on screen
    - Key concepts that can be highlighted with graphics
    - Practical examples that can be demonstrated
    - Clear transitions between topics
    
    Make sure the content is educational, engaging, and appropriate for the topic.`;

    console.log(
      "🤖 [GENERATE-VIDEO-COURSE] Calling OpenAI with prompt:",
      `Create a video course about: ${prompt}`
    );
    console.log(
      "📋 [GENERATE-VIDEO-COURSE] Using schema:",
      JSON.stringify(videoCourseSchema.shape, null, 2)
    );

    const startTime = Date.now();
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: videoCourseSchema,
      prompt: `Create a video course about: ${prompt}`,
      system: systemPrompt,
      temperature: 0.7,
    });
    const endTime = Date.now();

    console.log(
      `⏱️ [GENERATE-VIDEO-COURSE] Generation took ${endTime - startTime}ms`
    );
    console.log(
      "📊 [GENERATE-VIDEO-COURSE] Generated object:",
      JSON.stringify(object, null, 2)
    );
    console.log(
      "✅ [GENERATE-VIDEO-COURSE] Successfully generated video course"
    );

    return NextResponse.json(object);
  } catch (error) {
    console.error(
      "❌ [GENERATE-VIDEO-COURSE] Video course generation error:",
      error
    );
    console.error(
      "❌ [GENERATE-VIDEO-COURSE] Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return NextResponse.json(
      { error: "Failed to generate video course" },
      { status: 500 }
    );
  }
}
