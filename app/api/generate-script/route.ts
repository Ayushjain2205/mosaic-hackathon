import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("[SCRIPT] Starting script generation");

    const apiKey = process.env.OPENAI_API_KEY;
    console.log("[SCRIPT] OpenAI API key exists:", !!apiKey);

    if (!apiKey || apiKey.trim() === "") {
      console.log("[SCRIPT] Missing or empty OpenAI API key");
      return NextResponse.json(
        {
          error:
            "OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    const { topic, speakerCount } = await request.json();
    console.log("[SCRIPT] Request data:", { topic, speakerCount });

    if (!topic || !speakerCount) {
      console.log("[SCRIPT] Missing required fields");
      return NextResponse.json(
        { error: "Topic and speaker count are required" },
        { status: 400 }
      );
    }

    const limitedSpeakerCount = Math.min(speakerCount, 4);
    console.log("[SCRIPT] Generating text with OpenAI...");

    const { text: script } = await generateText({
      model: openai("gpt-4o", { apiKey }),
      system: `You are a podcast script writer specializing in ElevenLabs v3 text-to-speech optimization. Create engaging, natural conversations that leverage audio tags for emotional expression and clear speaker differentiation.`,
      prompt: `Create a SHORT podcast script about "${topic}" with ${limitedSpeakerCount} speakers optimized for ElevenLabs v3 text-to-speech.

CRITICAL REQUIREMENT: Keep the ENTIRE script under 2800 characters total to fit ElevenLabs limits.

FORMATTING REQUIREMENTS:
- Format as "Speaker 1:", "Speaker 2:", "Speaker 3:", "Speaker 4:" (numbered format only)
- Each speaker should have 2-3 lines maximum
- Keep individual lines concise but engaging (150-200 characters each)
- Use natural speech patterns with proper punctuation
- Do NOT use names - only use the numbered Speaker format

AUDIO TAG INTEGRATION:
- Include emotional audio tags: [excited], [curious], [laughs], [sighs]
- Add vocal delivery tags: [dramatically], [sarcastically]
- Use tags sparingly to save character count
- Match tags to speaker personality

CONTENT STRUCTURE:
- Brief introduction (1-2 lines per speaker)
- Core discussion (1-2 exchanges)
- Quick wrap-up (1 line per speaker)
- Keep it conversational but CONCISE

Example format:
Speaker 1: [excited] Welcome to today's episode about ${topic}! This is going to be fascinating.

Speaker 2: [curious] I've been researching this and found some surprising insights...

Make it feel natural but keep the TOTAL script under 2800 characters including all formatting and tags.`,
    });

    console.log("[SCRIPT] Script generated, length:", script.length);
    console.log("[SCRIPT] Script content:", script);

    return NextResponse.json({ script });
  } catch (error) {
    console.error("[SCRIPT] Error generating script:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    const errorDetails = error instanceof Error ? error.stack : String(error);
    console.error("[SCRIPT] Full error details:", errorDetails);

    return NextResponse.json(
      {
        error: `Script generation failed: ${errorMessage}`,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
