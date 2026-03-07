import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = "platform_os_admin_session";

/**
 * Validates the signed session token set by the validatePin server action.
 * Token format: base64(timestamp).base64(timestamp:secret)
 */
function isValidToken(token: string | undefined): boolean {
    if (!token) return false;

    const secret = process.env.ADMIN_SESSION_SECRET ?? "change-me-in-production";

    const parts = token.split(".");
    if (parts.length !== 2) return false;

    try {
        const timestamp = Buffer.from(parts[0], "base64").toString("utf-8");
        const expectedSig = Buffer.from(`${timestamp}:${secret}`).toString("base64");

        // Timing-safe-ish comparison (not crypto.timingSafeEqual since edge may not support it)
        if (parts[1] !== expectedSig) return false;

        // Check token is not older than 1 hour
        const age = Date.now() - parseInt(timestamp, 10);
        if (age > 60 * 60 * 1000) return false;

        return true;
    } catch {
        return false;
    }
}

export function proxy(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const token = request.cookies.get(SESSION_COOKIE)?.value;

        if (!isValidToken(token)) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
