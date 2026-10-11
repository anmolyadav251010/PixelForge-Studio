import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminCookieName, isAdminTokenValid } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export const runtime="nodejs";
export async function GET() {
  const cookieStore=await cookies();
  if(!isAdminTokenValid(cookieStore.get(adminCookieName)?.value))return NextResponse.json({error:"Administrator sign-in required."},{status:401});
  try { const enquiries=await db.enquiry.findMany({orderBy:{createdAt:"desc"},take:200}); return NextResponse.json({enquiries},{headers:{"Cache-Control":"no-store"}}); }
  catch(error) { console.error("Failed to retrieve contact enquiries",error); return NextResponse.json({error:"Enquiries are not available right now."},{status:503}); }
}