import { cookies } from "next/headers";

const SESSION_COOKIE = "platform_os_admin_session";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const secret = process.env.ADMIN_SESSION_SECRET ?? "change-me-in-production";
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  try {
    const timestamp = Buffer.from(parts[0], "base64").toString("utf-8");
    const expectedSig = Buffer.from(`${timestamp}:${secret}`).toString("base64");
    if (parts[1] !== expectedSig) return false;
    const age = Date.now() - parseInt(timestamp, 10);
    return age <= 60 * 60 * 1000; // 1 hour
  } catch {
    return false;
  }
}
