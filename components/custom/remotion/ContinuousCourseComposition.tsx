"use client"

import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion"

interface Section {
  title: string
  content: string
  key_points: string[]
}

interface CourseContent {
  title: string
  sections: Section[]
}

interface ContinuousCourseCompositionProps {
  courseContent: CourseContent
}

export const ContinuousCourseComposition = ({ courseContent }: ContinuousCourseCompositionProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Each section is 15 seconds (450 frames at 30fps)
  const sectionDuration = 450

  // Calculate which section we're currently in
  const currentSectionIndex = Math.min(Math.floor(frame / sectionDuration), Math.max(0, courseContent.sections.length - 1))

  // Calculate the frame relative to the current section
  const frameInSection = frame - currentSectionIndex * sectionDuration

  // Animation timings within each section
  const titleStart = 0
  const titleDuration = 90
  const contentStart = 90
  const contentDuration = 150
  const pointsStart = 240
  const transitionStart = 420 // Start transition to next section

  // Get current section data
  const currentSection = courseContent.sections[currentSectionIndex] || {
    title: "",
    content: "",
    key_points: [],
  }

  // Get next section data (if available)
  const hasNextSection = currentSectionIndex < courseContent.sections.length - 1
  const nextSection = hasNextSection ? courseContent.sections[currentSectionIndex + 1] : {
    title: "",
    content: "",
    key_points: [],
  }

  // Transition animation for section change
  const transitionProgress = hasNextSection
    ? spring({
        frame: Math.max(0, frameInSection - transitionStart),
        fps,
        from: 0,
        to: 1,
        durationInFrames: 30,
      })
    : 0

  // Current section animations
  const titleOpacity =
    spring({
      frame: frameInSection,
      fps,
      from: 0,
      to: 1,
      durationInFrames: 30,
    }) *
    (1 - transitionProgress)

  const titleY = spring({
    frame: frameInSection,
    fps,
    from: -20,
    to: 0,
    durationInFrames: 30,
  })

  // Title moves up when content appears
  const titleMoveUp =
    frameInSection >= contentStart
      ? spring({
          frame: Math.max(0, frameInSection - contentStart),
          fps,
          from: 0,
          to: -40,
          durationInFrames: 30,
        })
      : 0

  const contentOpacity =
    frameInSection >= contentStart
      ? spring({
          frame: Math.max(0, frameInSection - contentStart),
          fps,
          from: 0,
          to: 1,
          durationInFrames: 30,
        }) *
        (1 - transitionProgress)
      : 0

  const contentY =
    frameInSection >= contentStart
      ? spring({
          frame: Math.max(0, frameInSection - contentStart),
          fps,
          from: 20,
          to: 0,
          durationInFrames: 30,
        })
      : 0

  // Content moves up when key points appear
  const contentMoveUp =
    frameInSection >= pointsStart
      ? spring({
          frame: Math.max(0, frameInSection - pointsStart),
          fps,
          from: 0,
          to: -30,
          durationInFrames: 30,
        })
      : 0

  const pointsOpacity =
    frameInSection >= pointsStart
      ? spring({
          frame: Math.max(0, frameInSection - pointsStart),
          fps,
          from: 0,
          to: 1,
          durationInFrames: 30,
        }) *
        (1 - transitionProgress)
      : 0

  // Next section animations (for transition)
  const nextTitleOpacity = hasNextSection ? transitionProgress : 0

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
          {courseContent.title}
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
        {/* Current Section Content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 120px",
            opacity: 1 - transitionProgress, // Fade out during transition
            transform: `translateX(${transitionProgress * -100}px)`, // Slide left during transition
          }}
        >
          {/* Current Section Title */}
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
            {currentSection.title}
          </div>

          {/* Current Section Content */}
          {frameInSection >= contentStart && (
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
              {currentSection.content}
            </div>
          )}

          {/* Current Section Key Points */}
          {frameInSection >= pointsStart && (
            <div
              style={{
                marginTop: 80,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: pointsOpacity,
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
                {(currentSection.key_points || []).map((point, index) => {
                  const delay = pointsStart + 20 + index * 15
                  const pointOpacity =
                    frameInSection >= delay
                      ? spring({
                          frame: Math.max(0, frameInSection - delay),
                          fps,
                          from: 0,
                          to: 1,
                          durationInFrames: 20,
                        })
                      : 0

                  const pointX =
                    frameInSection >= delay
                      ? spring({
                          frame: Math.max(0, frameInSection - delay),
                          fps,
                          from: 50,
                          to: 0,
                          durationInFrames: 20,
                        })
                      : 50

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

        {/* Next Section (for transition) */}
        {hasNextSection && frameInSection >= transitionStart && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 120px",
              opacity: nextTitleOpacity,
              transform: `translateX(${(1 - transitionProgress) * 100}px)`, // Slide in from right
            }}
          >
            {/* Next Section Title */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "#1e293b",
                textAlign: "center",
                marginBottom: 60,
              }}
            >
              {nextSection?.title || ""}
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

      {/* Progress indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 40,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: "#64748b",
          }}
        >
          {currentSectionIndex + 1} / {courseContent.sections.length}
        </div>
      </div>
    </AbsoluteFill>
  )
}
