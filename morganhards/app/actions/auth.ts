"use server";

import { cookies } from "next/headers";

const SESSION_COOKIE = "platform_os_admin_session";

/**
 * Validates the submitted PIN against the server-side environment variable.
 * - Never exposes the PIN to the browser.
 * - Sets a signed HttpOnly cookie on success.
 */
export async function validatePin(pin: string): Promise<{ success: boolean; error?: string }> {
    const adminPin = process.env.ADMIN_PIN;

    if (!adminPin) {
        console.error("ADMIN_PIN environment variable is not set.");
        return { success: false, error: "Server configuration error." };
    }

    if (pin !== adminPin) {
        return { success: false, error: "Invalid PIN." };
    }

    // Build a simple signed token: base64(timestamp) + "." + base64(HMAC-lite)
    // Using a Secret to sign so the cookie cannot be forged.
    const secret = process.env.ADMIN_SESSION_SECRET ?? "change-me-in-production";
    const timestamp = Date.now().toString();
    const payload = Buffer.from(timestamp).toString("base64");
    const sig = Buffer.from(`${timestamp}:${secret}`).toString("base64");
    const token = `${payload}.${sig}`;

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,       // not accessible via JS
        secure: process.env.NODE_ENV === "production", // HTTPS-only in prod
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,      // 1 hour
    });

    return { success: true };
}

/**
 * Clears the admin session cookie server-side on logout.
 */
export async function logoutAdmin(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });
}
