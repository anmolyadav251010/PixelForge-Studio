"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { categories, projects } from "@/lib/projects";

export function PortfolioGrid() {
  const [active, setActive] = useState<string>(categories[0]);
  const filtered = useMemo(() => projects.filter((project) => active === categories[0] || project.category === active), [active]);
  return <><div className="portfolio-filters" role="group" aria-label="Filter projects by category">{categories.map((category) => <button key={category} type="button" className={`filter-button${active === category ? " filter-button-active" : ""}`} aria-pressed={active === category} onClick={() => setActive(category)}>{category}<span className="filter-count">{category === "All work" ? projects.length : projects.filter((project) => project.category === category).length}</span></button>)}</div><div className="portfolio-grid" aria-live="polite">{filtered.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></>;
}