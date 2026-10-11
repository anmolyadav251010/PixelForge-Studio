import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { BrandMark } from "@/components/icons";

export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div className="footer-lockup"><span className="footer-mark"><BrandMark size={23} /></span><span>Made of good ideas.<br /><span className="text-muted">And even better details.</span></span></div><Link href="/contact" className="footer-invite">Have one in mind? <ArrowUpRight size={18} /></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PixelForge Studio. Fictional studio &amp; portfolio.</span><div className="footer-nav"><Link href="/services">Services</Link><Link href="/portfolio">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/admin" aria-label="Administrator sign in">Admin <MoveUpRight size={12} /></Link></div></div></footer>;
}