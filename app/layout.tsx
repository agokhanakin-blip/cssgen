import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Atmosphere } from "@/components/shared/Atmosphere";
import { PageContainer } from "@/components/shared/PageContainer";
import { WebsiteJsonLd } from "@/components/seo/WebsiteJsonLd";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "Free CSS design tools for gradients, box shadows, border radius, color palettes, layout generators, and browser-based utilities — fast, no signup, copy-ready output.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full`}
    >
      <body className="relative flex min-h-full flex-col antialiased">
        <Atmosphere />
        <WebsiteJsonLd />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4LH7JE0XF5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-4LH7JE0XF5');
    `}
        </Script>

        <Header />
        <main className="relative z-10 flex flex-1 flex-col">
          <PageContainer>{children}</PageContainer>
        </main>
        <Footer />
      </body>
    </html>
  );
}
