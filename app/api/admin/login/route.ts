import { NextResponse } from "next/server";
import { z } from "zod";
import { adminCookieName, createAdminToken, verifyAdminPassword } from "@/lib/admin-auth";

export const runtime="nodejs";
const loginSchema=z.object({password:z.string().min(1).max(512)});
export async function POST(request:Request) {
  let body:unknown; try { body=await request.json(); } catch { return NextResponse.json({error:"Enter the administrator password."},{status:400}); }
  const parsed=loginSchema.safeParse(body); if(!parsed.success)return NextResponse.json({error:"Enter the administrator password."},{status:400});
  if(!process.env.ADMIN_PASSWORD||!process.env.ADMIN_SESSION_SECRET)return NextResponse.json({error:"Admin access has not been configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET."},{status:503});
  if(!verifyAdminPassword(parsed.data.password))return NextResponse.json({error:"That password did not match."},{status:401});
  const token=createAdminToken(); const response=NextResponse.json({success:true});
  response.cookies.set(adminCookieName,token.value,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/api/admin",maxAge:token.maxAge}); return response;
}