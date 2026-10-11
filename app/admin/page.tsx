import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = { title:"Private workspace", robots:{index:false,follow:false} };
export default function AdminPage() { return <><header className="page-intro admin-intro"><div className="container"><p className="eyebrow"><span className="eyebrow-dot" />Studio admin</p><h1>Enquiries, thoughtfully kept.</h1><p>A private, password-protected view of incoming project enquiries.</p></div></header><div className="admin-shell"><AdminDashboard /></div></>; }