// app/layout.tsx
import { Inter, Outfit } from "next/font/google";
import { Metadata } from "next";
import Providers from "@/components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Echo — Voice-First Journaling Platform",
    template: "%s | Echo",
  },
  description:
    "Capture your daily reflections, thoughts, and voice notes seamlessly in a distraction-free, privacy-focused workspace.",
  keywords: [
    "Voice Journal",
    "Journaling App",
    "Audio Notes",
    "Daily Reflection",
    "Mental Clarity",
    "Echo Journal",
  ],
  authors: [{ name: "Seth Nkwo" }],
  creator: "Seth Nkwo",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Echo — Voice-First Journaling Platform",
    description:
      "Capture your daily reflections, thoughts, and voice notes seamlessly.",
    siteName: "Echo",
    // images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Echo Journaling Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Echo — Voice-First Journaling Platform",
    description:
      "Capture your daily reflections, thoughts, and voice notes seamlessly.",
    // creator: "@echojournal",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}