import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card" style={{ animationDelay: `${index * 70}ms` }}>
    <Link href={`/portfolio/${project.slug}`} className="project-image-wrap" aria-label={`View ${project.name} project details`}><div className="project-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 42%, rgba(7,15,28,.28) 100%), url("${project.image}")` }} role="img" aria-label={project.imageAlt}><span className="project-image-category">{project.category}</span><span className="project-image-arrow"><ArrowUpRight size={18} /></span></div></Link>
    <div className="project-meta"><div><h3><Link href={`/portfolio/${project.slug}`}>{project.name}</Link></h3><p>{project.client}</p></div><span className="project-year">{project.year}</span></div><p className="project-summary">{project.summary}</p>
  </article>;
}