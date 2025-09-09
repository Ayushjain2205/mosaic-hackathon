export interface MascotProps {
  width?: number
  height?: number
  className?: string
  alt?: string
}

export function Mascot({ width = 200, height = 200, className = "", alt = "Miss Nova Mascot" }: MascotProps) {
  return (
    <div
      className={`mascot ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: "url('/images/mascot.svg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      role="img"
      aria-label={alt}
    />
  )
}

