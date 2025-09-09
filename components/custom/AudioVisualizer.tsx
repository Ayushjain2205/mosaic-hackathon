"use client";

import { useEffect, useRef, useState } from "react";
import { Waveform } from "@wavesurfer/react";
import { useWavesurfer } from "@wavesurfer/react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioVisualizerProps {
  audioUrl: string;
  title: string;
  isPlaying?: boolean;
  onPlayPause?: (isPlaying: boolean) => void;
  onTimeUpdate?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  onMute?: (isMuted: boolean) => void;
  className?: string;
}

export const AudioVisualizer = ({
  audioUrl,
  title,
  isPlaying = false,
  onPlayPause,
  onTimeUpdate,
  onVolumeChange,
  onMute,
  className = "",
}: AudioVisualizerProps) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const {
    wavesurfer,
    isPlaying: wsIsPlaying,
    isReady,
  } = useWavesurfer({
    container: containerRef,
    waveColor: "#3b82f6",
    progressColor: "#1d4ed8",
    cursorColor: "#1e40af",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 100,
    normalize: true,
    backend: "WebAudio",
    mediaControls: false,
  });

  // Handle play/pause
  useEffect(() => {
    if (!wavesurfer) return;

    if (isPlaying && !wsIsPlaying) {
      wavesurfer.play();
    } else if (!isPlaying && wsIsPlaying) {
      wavesurfer.pause();
    }
  }, [isPlaying, wavesurfer, wsIsPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!wavesurfer) return;
    wavesurfer.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted, wavesurfer]);

  // Set up event listeners
  useEffect(() => {
    if (!wavesurfer) return;

    const handlePlay = () => {
      onPlayPause?.(true);
    };

    const handlePause = () => {
      onPlayPause?.(false);
    };

    const handleTimeUpdate = () => {
      const time = wavesurfer.getCurrentTime();
      setCurrentTime(time);
      onTimeUpdate?.(time);
    };

    const handleReady = () => {
      setDuration(wavesurfer.getDuration());
    };

    const handleFinish = () => {
      onPlayPause?.(false);
    };

    wavesurfer.on("play", handlePlay);
    wavesurfer.on("pause", handlePause);
    wavesurfer.on("timeupdate", handleTimeUpdate);
    wavesurfer.on("ready", handleReady);
    wavesurfer.on("finish", handleFinish);

    return () => {
      wavesurfer.un("play", handlePlay);
      wavesurfer.un("pause", handlePause);
      wavesurfer.un("timeupdate", handleTimeUpdate);
      wavesurfer.un("ready", handleReady);
      wavesurfer.un("finish", handleFinish);
    };
  }, [wavesurfer, onPlayPause, onTimeUpdate]);

  // Load audio when URL changes
  useEffect(() => {
    if (!wavesurfer || !audioUrl) return;
    wavesurfer.load(audioUrl);
  }, [wavesurfer, audioUrl]);

  const handlePlayPause = () => {
    if (!wavesurfer) return;
    if (wsIsPlaying) {
      wavesurfer.pause();
    } else {
      wavesurfer.play();
    }
  };

  const handleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    onMute?.(newMuted);
  };

  const handleVolumeSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    onVolumeChange?.(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200 shadow-sm ${className}`}
    >
      <div className="space-y-4">
        {/* Waveform */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
          <div ref={containerRef} className="w-full" />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between space-x-4">
          {/* Play/Pause Button */}
          <Button
            onClick={handlePlayPause}
            disabled={!isReady}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-3 shadow-md transition-all duration-200"
          >
            {wsIsPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>

          {/* Time Display */}
          <div className="flex-1 text-center">
            <span className="text-sm font-medium text-slate-700">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Volume Controls */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleMute}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-slate-100 text-slate-600"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeSliderChange}
              className="w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                  volume * 100
                }%, #e2e8f0 ${volume * 100}%, #e2e8f0 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
