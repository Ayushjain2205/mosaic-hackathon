import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the Zod schema for type-safe audio course generation
const audioCourseSchema = z.object({
  title: z.string().describe("The audio course title"),
  description: z.string().describe("Brief audio course description"),
  total_sections: z
    .number()
    .describe("Total number of audio sections (should be 5)"),
  sections: z.array(
    z.object({
      section_number: z.number().describe("The section number"),
      title: z.string().describe("The section title"),
      content: z
        .string()
        .describe(
          "Detailed content for the audio section with examples and explanations"
        ),
      key_points: z
        .array(z.string())
        .describe("Key points to highlight in the audio"),
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
  console.log("🎧 [GENERATE-AUDIO-COURSE] API called");

  try {
    const body = await req.json();
    console.log(
      "📥 [GENERATE-AUDIO-COURSE] Request body:",
      JSON.stringify(body, null, 2)
    );

    const { prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      console.log("❌ [GENERATE-AUDIO-COURSE] Invalid prompt:", prompt);
      return NextResponse.json(
        { error: "Valid prompt is required" },
        { status: 400 }
      );
    }

    console.log("✅ [GENERATE-AUDIO-COURSE] Valid prompt received:", prompt);
    console.log("🔍 [GENERATE-AUDIO-COURSE] Prompt type:", typeof prompt);
    console.log("🔍 [GENERATE-AUDIO-COURSE] Prompt length:", prompt.length);

    const systemPrompt = `You are Miss Nova, an expert AI teacher who creates engaging audio courses on any topic.
    
    Create a structured audio course based on the user's topic. The course should include:
    1. A descriptive title and overview
    2. 5 audio sections, each with:
       - A clear title that works well for audio content
       - Detailed content that can be presented in audio format
       - Key points that can be highlighted verbally
       - A quiz question with 4 options, the correct answer, and an explanation
    
    Make the content engaging and suitable for audio presentation. Focus on:
    - Clear, conversational language that works well when spoken
    - Step-by-step explanations that are easy to follow by ear
    - Key concepts that can be emphasized through tone and pacing
    - Practical examples that can be described verbally
    - Smooth transitions between topics
    - Engaging storytelling elements
    
    Make sure the content is educational, engaging, and appropriate for the topic.`;

    console.log(
      "🤖 [GENERATE-AUDIO-COURSE] Calling OpenAI with prompt:",
      `Create an audio course about: ${prompt}`
    );
    console.log(
      "📋 [GENERATE-AUDIO-COURSE] Using schema:",
      JSON.stringify(audioCourseSchema.shape, null, 2)
    );

    const startTime = Date.now();
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: audioCourseSchema,
      prompt: `Create an audio course about: ${prompt}`,
      system: systemPrompt,
      temperature: 0.7,
    });
    const endTime = Date.now();

    console.log(
      `⏱️ [GENERATE-AUDIO-COURSE] Generation took ${endTime - startTime}ms`
    );
    console.log(
      "📊 [GENERATE-AUDIO-COURSE] Generated object:",
      JSON.stringify(object, null, 2)
    );
    console.log(
      "✅ [GENERATE-AUDIO-COURSE] Successfully generated audio course"
    );

    return NextResponse.json(object);
  } catch (error) {
    console.error(
      "❌ [GENERATE-AUDIO-COURSE] Audio course generation error:",
      error
    );
    console.error(
      "❌ [GENERATE-AUDIO-COURSE] Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return NextResponse.json(
      { error: "Failed to generate audio course" },
      { status: 500 }
    );
  }
}
