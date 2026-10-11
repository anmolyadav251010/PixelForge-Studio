import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { enquirySchema } from "@/lib/validation";

export const runtime="nodejs";
export async function POST(request:Request) {
  let body:unknown; try { body=await request.json(); } catch { return NextResponse.json({error:"Please submit a valid enquiry."},{status:400}); }
  const parsed=enquirySchema.safeParse(body);
  if(!parsed.success) return NextResponse.json({error:"Please check the highlighted fields and try again.",errors:parsed.error.flatten().fieldErrors},{status:400});
  if(parsed.data.website)return NextResponse.json({success:true},{status:200});
  try { const {name,email,company,service,budget,message}=parsed.data; await db.enquiry.create({data:{name,email,company:company||null,service,budget:budget||null,message}}); return NextResponse.json({success:true},{status:201}); }
  catch(error) { console.error("Failed to save contact enquiry",error); return NextResponse.json({error:"We could not save your enquiry right now. Please try again shortly."},{status:503}); }
}