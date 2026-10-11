import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title:"Contact", description:"Send PixelForge Studio a note about a website, digital product, or good idea. Fictional portfolio demo form; enquiries are stored only in your configured database." };

export default function ContactPage() {
  return <><header className="page-intro"><div className="container"><p className="eyebrow"><span className="eyebrow-dot" />Contact</p><h1>Every good thing starts somewhere.</h1><p>Tell us a little about what you have in mind. The early, messy version is a perfectly good place to start.</p></div></header><section className="container contact-layout"><aside className="contact-aside"><p className="eyebrow"><span className="eyebrow-dot" />Drop us a line</p><h2>Tell us what you&apos;re thinking.</h2><p>A project, a question, or just a half-formed idea. We&apos;d love to hear the shape of it.</p><a className="contact-email" href="mailto:hello@pixelforge.example"><Mail size={16} />hello@pixelforge.example <ArrowUpRight size={14} /></a><p className="contact-fiction-note">PixelForge is a fictional studio portfolio. This demo form saves enquiries to the database configured by your deployment.</p></aside><ContactForm /></section></>;
}