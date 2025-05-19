export function GridBackground() {
  return (
    <div
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        backgroundPosition: "0 0",
      }}
    />
  )
}
