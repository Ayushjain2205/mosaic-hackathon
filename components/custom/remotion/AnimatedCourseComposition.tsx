"use client"

import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion"

interface SlideContent {
  title: string
  content: string
  key_points: string[]
}

interface AnimatedCourseCompositionProps {
  slide: SlideContent
  courseTitle: string
}

export const AnimatedCourseComposition = ({ slide, courseTitle }: AnimatedCourseCompositionProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Animation timings - adjusted to prevent overlap
  const titleStart = 0
  const titleDuration = 90 // Increased duration
  const contentStart = 30
  const contentDuration = 150 // Increased duration
  const pointsStart = 90

  // Calculate spring animations
  const titleOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  })

  const titleY = spring({
    frame,
    fps,
    from: -20,
    to: 0,
    durationInFrames: 30,
  })

  // Title moves up when content appears
  const titleMoveUp = spring({
    frame: Math.max(0, frame - contentStart),
    fps,
    from: 0,
    to: -40, // Move up to make room for content
    durationInFrames: 30,
  })

  const contentOpacity = spring({
    frame: Math.max(0, frame - contentStart),
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  })

  const contentY = spring({
    frame: Math.max(0, frame - contentStart),
    fps,
    from: 20,
    to: 0,
    durationInFrames: 30,
  })

  // Content moves up when key points appear
  const contentMoveUp = spring({
    frame: Math.max(0, frame - pointsStart),
    fps,
    from: 0,
    to: -30, // Move up to make room for key points
    durationInFrames: 30,
  })

  return (
    <AbsoluteFill style={{ backgroundColor: "#f8fafc", fontFamily: "sans-serif" }}>
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "300px",
          background: "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))",
          borderRadius: "0 0 50% 50%/0 0 100% 100%",
          transform: "scaleX(1.5)",
        }}
      />

      {/* Course title header */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: "#3b82f6",
            opacity: 0.8,
          }}
        >
          {courseTitle}
        </div>
      </div>

      {/* Main content container */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 120px",
        }}
      >
        {/* Slide title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#1e293b",
            textAlign: "center",
            marginBottom: 60,
            opacity: titleOpacity,
            transform: `translateY(${titleY + titleMoveUp}px)`,
          }}
        >
          {slide.title}
        </div>

        {/* Slide content */}
        {frame >= contentStart && (
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.5,
              color: "#334155",
              textAlign: "center",
              maxWidth: 1200,
              opacity: contentOpacity,
              transform: `translateY(${contentY + contentMoveUp}px)`,
            }}
          >
            {slide.content}
          </div>
        )}

        {/* Key points */}
        {frame >= pointsStart && (
          <div
            style={{
              marginTop: 80,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: spring({
                frame: Math.max(0, frame - pointsStart),
                fps,
                from: 0,
                to: 1,
                durationInFrames: 20,
              }),
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: "#3b82f6",
                marginBottom: 30,
              }}
            >
              Key Points
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                width: "100%",
                maxWidth: 900,
              }}
            >
              {slide.key_points.map((point, index) => {
                const delay = pointsStart + 20 + index * 15
                const pointOpacity = spring({
                  frame: Math.max(0, frame - delay),
                  fps,
                  from: 0,
                  to: 1,
                  durationInFrames: 20,
                })

                const pointX = spring({
                  frame: Math.max(0, frame - delay),
                  fps,
                  from: 50,
                  to: 0,
                  durationInFrames: 20,
                })

                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      opacity: pointOpacity,
                      transform: `translateX(${pointX}px)`,
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#3b82f6",
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 30,
                        color: "#475569",
                      }}
                    >
                      {point}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Branding footer */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#3b82f6",
          }}
        >
          Created by Miss Nova
        </div>
      </div>
    </AbsoluteFill>
  )
}
