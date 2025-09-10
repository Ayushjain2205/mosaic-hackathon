import type { NextRequest } from "next/server";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export async function POST(request: NextRequest) {
  try {
    console.log("[AUDIO] Starting audio generation API");

    const { script } = await request.json();
    console.log("[AUDIO] Script received, length:", script?.length);

    if (!script) {
      console.error("[AUDIO] No script provided");
      return new Response(JSON.stringify({ error: "Script is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const maxCharacters = 2900; // Leave some buffer under 3000 limit
    let processedScript = script;

    if (script.length > maxCharacters) {
      console.log(
        "[AUDIO] Script too long, truncating from",
        script.length,
        "to",
        maxCharacters
      );
      processedScript = script.substring(0, maxCharacters);
      // Try to end at a complete line
      const lastNewline = processedScript.lastIndexOf("\n");
      if (lastNewline > maxCharacters * 0.8) {
        // Only truncate at newline if it's not too far back
        processedScript = processedScript.substring(0, lastNewline);
      }
    }

    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    if (!elevenLabsApiKey) {
      console.error("[AUDIO] ElevenLabs API key not configured");
      return new Response(
        JSON.stringify({ error: "ElevenLabs API key not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("[AUDIO] Creating ElevenLabs client");
    const client = new ElevenLabsClient({ apiKey: elevenLabsApiKey });

    // Parse the script to extract speaker lines
    const lines = processedScript
      .split("\n")
      .filter((line: string) => line.trim());
    const inputs = [];

    const voiceIds = [
      "UgBBYS2sOqTuMpoF3BR0", // Mark - Natural Conversations (male, american)
      "NFG5qt843uXKj4pFvR7C", // Adam Stone - late night radio (male, british)
      "cgSgspJ2msm6clMCkdW9", // Hope - upbeat and clear (female, american)
      "56AoDkrOh6qfVPDXZ7Pt", // Cassidy (female, american)
    ];

    console.log("[AUDIO] Parsing script lines:", lines.length);
    console.log("[AUDIO] Full script content:", JSON.stringify(script));
    console.log(
      "[AUDIO] Script lines:",
      lines.map((line, i) => `${i}: "${line}"`)
    );

    for (const line of lines) {
      console.log("[AUDIO] Processing line:", JSON.stringify(line));
      const match = line.match(/^Speaker (\d+):\s*(.+)$/);
      if (match) {
        const speakerNumber = Number.parseInt(match[1]) - 1;
        const text = match[2].trim();

        const voiceId = voiceIds[speakerNumber % voiceIds.length];

        inputs.push({
          text,
          voiceId,
        });

        console.log(
          "[AUDIO] Added speaker line:",
          `Speaker ${speakerNumber + 1}`,
          "->",
          voiceId,
          "text length:",
          text.length
        );
      } else {
        console.log(
          "[AUDIO] Line did not match Speaker pattern:",
          JSON.stringify(line)
        );
      }
    }

    console.log("[AUDIO] Parsed inputs:", inputs.length);
    if (inputs.length === 0) {
      console.error("[AUDIO] No valid speaker lines found");
      return new Response(
        JSON.stringify({ error: "No valid speaker lines found in script" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log(
      "[AUDIO] Calling ElevenLabs textToDialogue.stream with total characters:",
      inputs.reduce((total, input) => total + input.text.length, 0)
    );

    console.log(
      "[AUDIO] Successfully created audio stream with",
      inputs.length,
      "inputs"
    );

    const audioStream = await client.textToDialogue.stream({ inputs });

    return new Response(audioStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("[AUDIO] Error generating audio:", error);
    console.error(
      "[AUDIO] Error details:",
      error instanceof Error ? error.message : String(error)
    );
    console.error(
      "[AUDIO] Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return new Response(JSON.stringify({ error: "Failed to generate audio" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
