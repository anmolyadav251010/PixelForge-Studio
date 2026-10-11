import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, Compass, Cpu, LineChart, PenTool, Shapes } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

const offerings = [
  { icon: Code2, name: "Web development", description: "Fast, thoughtfully engineered websites that give good ideas somewhere to go." },
  { icon: Shapes, name: "Full-stack applications", description: "Useful digital tools, thoughtfully made from the first screen to the last endpoint." },
  { icon: PenTool, name: "UI/UX design", description: "Clear, considered interfaces that make useful things feel genuinely good to use." },
  { icon: Cpu, name: "Automation", description: "Less time on the repetitive stuff, more room for work that matters." },
  { icon: LineChart, name: "SEO", description: "Solid technical foundations and genuinely helpful content, ready to be discovered." },
];

export default function HomePage() {
  return <>
    <section className="hero" aria-labelledby="hero-title"><div className="hero-grid" /><div className="hero-glow" /><div className="container"><div className="hero-content">
      <p className="eyebrow"><span className="eyebrow-dot" />Independent digital studio <span aria-hidden="true">·</span> Fictional portfolio</p><h1 id="hero-title">Digital with a<br /><span className="hero-accent">little more thought.</span></h1><p className="hero-copy">We shape useful websites and digital products for people building something they believe in.</p><div className="hero-actions"><Link className="button button-primary" href="/portfolio">See what we make <ArrowUpRight size={16} /></Link><Link className="hero-secondary" href="/contact">Tell us what you&apos;re thinking <ArrowRight size={15} /></Link></div><p className="hero-note"><Compass size={15} strokeWidth={1.5} />Thoughtful from first sketch to final detail.</p>
    </div></div><div className="hero-showcase" aria-hidden="true"><span className="showcase-label">STUDIO / 001</span><span className="showcase-spark">✳</span><span className="showcase-orb" /><span className="showcase-axis" /><span className="showcase-line" /><span className="showcase-coordinate">IDEAS → INTERFACES → IMPACT</span></div></section>
    <section className="section" aria-labelledby="services-title"><div className="container"><SectionHeading eyebrow="How we can help" title="A good idea deserves a good build." description="A small, focused toolkit for turning the thing you have in mind into the thing people use." /><div className="services-grid">{offerings.map(({ icon: Icon, name, description }, index) => <article className="service-item" key={name}><div className="service-topline"><Icon size={19} strokeWidth={1.5} /><span className="service-number">0{index + 1}</span></div><h3>{name}</h3><p>{description}</p></article>)}</div><Link className="hero-secondary" style={{ marginTop:25 }} href="/services">A little more about our services <ArrowRight size={15} /></Link></div></section>
    <section className="section" aria-labelledby="work-title"><div className="container"><SectionHeading eyebrow="Selected concept work" title="Small details. Big picture." description="Six fictional collaborations that let us explore what better digital could feel like. Every brand and brief below is made up." /><div className="projects-grid">{projects.slice(0,4).map((project,index)=><ProjectCard project={project} index={index} key={project.slug} />)}</div><Link className="hero-secondary" style={{ marginTop:33 }} href="/portfolio">See all six projects <ArrowRight size={15} /></Link></div></section>
    <div className="container"><section className="cta-band"><div><p className="eyebrow"><span className="eyebrow-dot" />Something in the works?</p><h2>Let&apos;s give your next good idea some shape.</h2></div><Link href="/contact" className="button button-primary">Start a conversation <ArrowUpRight size={16} /></Link></section></div>
  </>;
}