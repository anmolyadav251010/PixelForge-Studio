"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [{ href: "/services", label: "Services" }, { href: "/portfolio", label: "Selected work" }, { href: "/about", label: "About" }];

export function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="nav-shell">
    <Link className="brand" href="/" aria-label="PixelForge Studio home" onClick={() => setOpen(false)}><span className="brand-mark"><span className="brand-square" /><span className="brand-spark" /></span><span>pixel<span className="brand-light">forge</span><span className="brand-period">.</span></span></Link>
    <button type="button" className="mobile-menu-toggle" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    <nav id="primary-navigation" className={`nav-links${open ? " nav-links-open" : ""}`} aria-label="Main navigation">
      {links.map((link) => <Link key={link.href} className="nav-link" href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
      <Link className="nav-contact" href="/contact" onClick={() => setOpen(false)}>Let&apos;s talk <ArrowUpRight size={15} strokeWidth={1.8} /></Link>
    </nav>
  </div></header>;
}