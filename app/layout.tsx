import type { Metadata, Viewport } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "PixelForge Studio — Digital with a little more thought.", template: "%s — PixelForge Studio" },
  description: "A fictional independent digital studio shaping useful, considered websites and digital products. Explore our clearly labelled concept portfolio.",
  applicationName: "PixelForge Studio",
  openGraph: { type: "website", siteName: "PixelForge Studio", title: "PixelForge Studio — Digital with a little more thought.", description: "A fictional independent digital studio. Good ideas, thoughtfully made.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "PixelForge Studio — digital with a little more thought" }] },
  twitter: { card: "summary_large_image", title: "PixelForge Studio — Digital with a little more thought.", description: "A fictional independent digital studio. Good ideas, thoughtfully made.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#09111e", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Navigation /><main id="main-content">{children}</main><Footer /></body></html>;
}