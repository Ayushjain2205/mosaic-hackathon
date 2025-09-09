"use client";

import { AbsoluteFill, useCurrentFrame, useVideoConfig, Audio } from "remotion";
import {
  useAudioData,
  visualizeAudioWaveform,
  createSmoothSvgPath,
} from "@remotion/media-utils";

interface AudioVisualizerCompositionProps {
  audioUrl: string;
  duration: number;
  title: string;
  isPlaying?: boolean;
}

export const AudioVisualizerComposition = ({
  audioUrl,
  duration,
  title,
  isPlaying = true,
}: AudioVisualizerCompositionProps) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Load audio data using Remotion's built-in API
  const audioData = useAudioData(audioUrl);

  if (!audioData) {
    return null;
  }

  // Get waveform data using the exact implementation from the docs
  const waveform = visualizeAudioWaveform({
    fps,
    frame,
    audioData,
    numberOfSamples: 32, // Power of 2 as required
    windowInSeconds: 1 / fps, // Basic example from docs
  });

  // Create smooth SVG path using the official function
  const waveformHeight = 300;
  const p = createSmoothSvgPath({
    points: waveform.map((x, i) => {
      return {
        x: (i / (waveform.length - 1)) * width,
        y: (x - 0.5) * waveformHeight + waveformHeight / 2,
      };
    }),
  });

  return (
    <div style={{ flex: 1 }}>
      <Audio src={audioUrl} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <svg
          style={{ backgroundColor: "#0B84F3" }}
          viewBox={`0 0 ${width} ${waveformHeight}`}
          width={width}
          height={waveformHeight}
        >
          <path stroke="white" fill="none" strokeWidth={10} d={p as string} />
        </svg>
      </AbsoluteFill>
    </div>
  );
};
