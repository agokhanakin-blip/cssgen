const NOISE_DATA_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
  );

/**
 * Fixed grain + vignette; pointer-events none so UI stays interactive.
 */
export function Atmosphere() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.032] mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE_DATA_URI}")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_50%,transparent_42%,rgb(0_0_0_/_0.035)_120%)]"
        aria-hidden
      />
    </>
  );
}
