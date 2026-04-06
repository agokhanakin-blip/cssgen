import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — free CSS generators`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f172a 0%, #134e4a 42%, #115e59 100%)",
          padding: 64,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#f0fdfa",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 26,
            color: "#99f6e4",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Free CSS generators for gradients, shadows, colors, layout, and
          browser-based design utilities.
        </div>
      </div>
    ),
    { ...size }
  );
}
