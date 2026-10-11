"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { services } from "@/lib/validation";

type SubmissionState = { status: "idle" | "submitting" | "success" | "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>({ status: "idle", message: "" });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === "submitting") return;
    setState({ status: "submitting", message: "Sending your note…" });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) {
        const message = result.errors ? Object.values(result.errors as Record<string, string[]>).flat()[0] : result.error;
        throw new Error(message || "We couldn't send your note just now. Please try again.");
      }
      form.reset();
      setState({ status: "success", message: "Your note is with us. We’ll be in touch soon." });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Something went wrong. Please try again." });
    }
  }

  return <form className="contact-form" onSubmit={submit} aria-busy={state.status === "submitting"}>
    <div className="form-fields">
      <label className="form-field"><span>Your name</span><input required minLength={2} maxLength={100} name="name" autoComplete="name" placeholder="First and last" /></label>
      <label className="form-field"><span>Email address</span><input required type="email" maxLength={254} name="email" autoComplete="email" placeholder="you@example.com" /></label>
      <label className="form-field"><span>Company <span className="optional-label">Optional</span></span><input maxLength={120} name="company" autoComplete="organization" placeholder="Your team or company" /></label>
      <label className="form-field"><span>What can we help with?</span><select required defaultValue="" name="service"><option value="" disabled>Select a service</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label>
      <label className="form-field form-field-wide"><span>Rough project budget <span className="optional-label">Optional</span></span><select defaultValue="" name="budget"><option value="">Select a range</option>{["Under $5k", "$5k–$10k", "$10k–$25k", "$25k+", "Not sure yet"].map((budget) => <option key={budget}>{budget}</option>)}</select></label>
      <label className="form-field form-field-wide"><span>A little about the project</span><textarea required minLength={20} maxLength={3000} rows={5} name="message" placeholder="What are you thinking about?" /></label>
      <div className="honeypot" aria-hidden="true"><label>Leave this empty<input tabIndex={-1} autoComplete="off" name="website" /></label></div>
    </div>
    <div className="form-actions"><button className="button button-primary" type="submit" disabled={state.status === "submitting"}>{state.status === "submitting" ? <LoaderCircle size={16} className="spin" /> : <ArrowUpRight size={16} />}{state.status === "submitting" ? "Sending…" : "Send your enquiry"}</button><p className="form-privacy">Your details are only used to reply to this enquiry.</p></div>
    {state.message && <p role={state.status === "error" ? "alert" : "status"} className={`form-feedback form-feedback-${state.status}`}>{state.status === "success" && <CheckCircle2 size={16} />}{state.message}</p>}
  </form>;
}