import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "./auth";
import { hasDatabase } from "./mongodb";

/** Server-side admin check used inside route handlers (Node runtime). */
export async function getCurrentAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function requireDatabase() {
  if (!hasDatabase) {
    return NextResponse.json(
      {
        error:
          "No database configured. Set MONGODB_URI in .env.local to enable saving data.",
      },
      { status: 503 }
    );
  }
  return null;
}

export function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
