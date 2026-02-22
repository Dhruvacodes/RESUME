import type { Metadata, Viewport } from "next";
import Analytics from "@/components/Analytics";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dhruvagrawal.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dhruv Agrawal — Systems ↔ Markets",
    template: "%s | Dhruv Agrawal",
  },
  description:
    "Systems Engineer & Quantitative Researcher. Building at the intersection of distributed systems, AI, and financial markets.",
  keywords: [
    "Dhruv Agrawal",
    "systems engineer",
    "quantitative researcher",
    "distributed systems",
    "AI research",
    "quantitative finance",
    "portfolio",
    "full-stack engineer",
  ],
  authors: [{ name: "Dhruv Agrawal", url: siteUrl }],
  creator: "Dhruv Agrawal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dhruv Agrawal",
    title: "Dhruv Agrawal — Systems ↔ Markets",
    description:
      "Systems Engineer & Quantitative Researcher. Building at the intersection of distributed systems, AI, and financial markets.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dhruv Agrawal — Systems ↔ Markets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Agrawal — Systems ↔ Markets",
    description:
      "Systems Engineer & Quantitative Researcher. Building at the intersection of distributed systems, AI, and financial markets.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfbf9" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
