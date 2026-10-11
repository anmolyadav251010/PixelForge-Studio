import assert from "node:assert/strict";
import test from "node:test";
import { categories, projects } from "../lib/projects";
import { enquirySchema } from "../lib/validation";

test("portfolio has six individually labelled fictional concept projects",()=>{ assert.equal(projects.length,6); assert.equal(new Set(projects.map(({slug})=>slug)).size,projects.length); assert.ok(projects.every(({client})=>client.startsWith("Fictional "))); assert.ok(categories.includes("All work")); });
test("contact validation accepts a valid enquiry and optional company",()=>{ const result=enquirySchema.safeParse({name:"Morgan Lee",email:"morgan@example.com",service:"Web development",message:"I have a small website project I would love to discuss."}); assert.equal(result.success,true); });
test("contact validation accepts the empty optional budget sent by HTML selects",()=>{ const result=enquirySchema.safeParse({name:"Morgan Lee",email:"morgan@example.com",service:"Web development",budget:"",message:"I have a small website project I would love to discuss."}); assert.equal(result.success,true); if(result.success)assert.equal(result.data.budget,undefined); });
test("contact validation rejects invalid email, short message, and filled honeypot",()=>{ const result=enquirySchema.safeParse({name:"M",email:"not-an-email",service:"Web development",message:"Too short",website:"spam"}); assert.equal(result.success,false); if(!result.success){assert.ok(result.error.flatten().fieldErrors.email);assert.ok(result.error.flatten().fieldErrors.message);assert.ok(result.error.flatten().fieldErrors.website);} });