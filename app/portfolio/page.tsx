import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const metadata: Metadata = { title:"Portfolio", description:"Explore six clearly labelled fictional concept projects, made to show the sort of digital experiences PixelForge Studio loves building." };

export default function PortfolioPage() {
  return <><header className="page-intro"><div className="container"><p className="eyebrow"><span className="eyebrow-dot" />Selected work <span aria-hidden="true">·</span> Fictional projects</p><h1>What if this idea had a digital home?</h1><p>Six made-up briefs. Six opportunities to explore a slightly more thoughtful kind of digital.</p></div></header><section className="container page-content" aria-label="Filterable portfolio"><PortfolioGrid /></section></>;
}