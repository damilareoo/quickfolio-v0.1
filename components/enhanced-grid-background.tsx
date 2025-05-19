export function EnhancedGridBackground() {
  return (
    <>
      {/* Base grid lines */}
      <div
        className="fixed inset-0 z-[-2] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.13) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.13) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Subtle dots at intersections */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
        }}
      />
    </>
  )
}
