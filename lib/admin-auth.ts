import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "pixelforge_admin";
const sessionDuration = 8 * 60 * 60;

function signature(expiresAt: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters.");
  return createHmac("sha256", secret).update(expiresAt).digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const digest = (value: string) => createHmac("sha256", "pixelforge-password-check").update(value).digest();
  return timingSafeEqual(digest(password), digest(expected));
}

export function createAdminToken() {
  const expiresAt = String(Math.floor(Date.now() / 1000) + sessionDuration);
  return { value: `${expiresAt}.${signature(expiresAt)}`, maxAge: sessionDuration };
}

export function isAdminTokenValid(token: string | undefined) {
  if (!token) return false;
  const [expiresAt, suppliedSignature, extra] = token.split(".");
  if (!expiresAt || !suppliedSignature || extra || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  try {
    const expectedSignature = signature(expiresAt);
    return timingSafeEqual(Buffer.from(suppliedSignature, "hex"), Buffer.from(expectedSignature, "hex"));
  } catch { return false; }
}

export const adminCookieName = cookieName;