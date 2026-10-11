import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap():MetadataRoute.Sitemap {
  const baseUrl=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";
  return [...["","/services","/portfolio","/about","/contact"].map(path=>({url:`${baseUrl}${path}`,changeFrequency:"monthly" as const})),...projects.map(project=>({url:`${baseUrl}/portfolio/${project.slug}`,changeFrequency:"yearly" as const}))];
}