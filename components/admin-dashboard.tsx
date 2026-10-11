"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LockKeyhole, LogOut, RefreshCw } from "lucide-react";

type Enquiry = { id: string; name: string; email: string; company: string | null; service: string; budget: string | null; message: string; createdAt: string };

export function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function loadEnquiries() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/enquiries", { cache: "no-store" });
      if (response.status === 401) { setAuthenticated(false); return; }
      if (!response.ok) throw new Error("Enquiries could not be loaded.");
      const data = await response.json();
      setEnquiries(data.enquiries); setAuthenticated(true); setError("");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Something went wrong."); }
    finally { setLoading(false); }
  }

  useEffect(() => { void loadEnquiries(); }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to sign in.");
      setPassword(""); await loadEnquiries();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to sign in."); setLoading(false); }
  }

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); setEnquiries([]); setAuthenticated(false); }

  if (loading && !authenticated) return <div className="admin-loading" role="status"><span className="loading-dot" /> Checking secure access…</div>;
  if (!authenticated) return <div className="admin-login"><div className="admin-lock-icon"><LockKeyhole size={22} /></div><p className="eyebrow"><span className="eyebrow-dot" />Private workspace</p><h2>Good to see you.</h2><p className="admin-login-copy">Sign in to review incoming project enquiries.</p><form onSubmit={login} className="admin-login-form"><label className="form-field"><span>Administrator password</span><input autoFocus required type="password" autoComplete="current-password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p className="form-feedback form-feedback-error" role="alert">{error}</p>}<button className="button button-primary" type="submit" disabled={loading}><LockKeyhole size={16} />{loading ? "Signing in…" : "Sign in"}</button></form></div>;

  return <section className="admin-inbox" aria-label="Project enquiries"><div className="admin-inbox-heading"><div><p className="eyebrow"><span className="eyebrow-dot" />Private workspace</p><h2>Your enquiries <span className="inbox-count">{enquiries.length}</span></h2></div><div className="admin-controls"><button className="admin-icon-button" type="button" onClick={() => void loadEnquiries()} aria-label="Refresh enquiries" title="Refresh enquiries"><RefreshCw size={16} /></button><button className="admin-icon-button" type="button" onClick={() => void logout()} aria-label="Sign out" title="Sign out"><LogOut size={16} /></button></div></div>{error && <p className="form-feedback form-feedback-error" role="alert">{error}</p>}{loading ? <div className="admin-loading" role="status"><span className="loading-dot" /> Loading enquiries…</div> : enquiries.length === 0 ? <div className="inbox-empty"><div className="empty-icon"><LockKeyhole size={19} /></div><h3>All caught up.</h3><p>New enquiries will appear here as they come in.</p></div> : <div className="enquiry-list">{enquiries.map((enquiry) => <article className="enquiry-item" key={enquiry.id}><div className="enquiry-header"><div><h3>{enquiry.name}</h3><a href={`mailto:${enquiry.email}`} className="enquiry-email">{enquiry.email}</a></div><time dateTime={enquiry.createdAt}>{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(enquiry.createdAt))}</time></div><div className="enquiry-details"><span>{enquiry.service}</span>{enquiry.company && <span>{enquiry.company}</span>}{enquiry.budget && <span>{enquiry.budget}</span>}</div><p className="enquiry-message">{enquiry.message}</p></article>)}</div>}</section>;
}