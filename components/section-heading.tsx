export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading"><p className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</p><h2 className="section-title">{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}