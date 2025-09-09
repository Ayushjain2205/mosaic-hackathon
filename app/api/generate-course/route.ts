import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Valid prompt is required" }, { status: 400 })
    }

    const systemPrompt = `You are Miss Nova, an expert AI teacher who creates comprehensive, engaging courses on any topic.
    
    Create a structured course based on the user's topic. The course should include:
    1. A descriptive title and overview
    2. 5 slides, each with:
       - A clear title
       - Detailed markdown content with examples and explanations
       - A quiz question with 4 options, the correct answer, and an explanation
    
    Format your response as a valid JSON object with this structure:
    {
      "title": "Course Title",
      "description": "Brief course description",
      "total_slides": 5,
      "slides": [
        {
          "slide_number": 1,
          "title": "Slide Title",
          "content": "Markdown content with **bold**, *italic*, and bullet points...",
          "quiz": {
            "question": "Quiz question?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct_answer": "Option A",
            "explanation": "Why this is the correct answer..."
          }
        },
        // more slides...
      ]
    }`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Create a course about: ${prompt}`,
      system: systemPrompt,
      temperature: 0.7,
      maxTokens: 4000,
    })

    // Parse the JSON response
    try {
      const courseData = JSON.parse(text)
      return NextResponse.json(courseData)
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError)
      return NextResponse.json({ error: "Failed to generate a valid course structure" }, { status: 500 })
    }
  } catch (error) {
    console.error("Course generation error:", error)
    return NextResponse.json({ error: "Failed to generate course" }, { status: 500 })
  }
}

