import { z } from "zod";

export const services = ["Web development", "Full-stack applications", "UI/UX design", "Automation", "SEO"] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  company: z.string().trim().max(120).optional().default(""),
  service: z.enum(services, { error: "Choose a service to discuss." }),
  budget: z.preprocess(
    (value) => value === "" ? undefined : value,
    z.enum(["Under $5k", "$5k–$10k", "$10k–$25k", "$25k+", "Not sure yet"]).optional(),
  ),
  message: z.string().trim().min(20, "Please add a little more detail (at least 20 characters).").max(3000),
  website: z.string().max(0, "Please leave this field empty.").optional().default(""),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;