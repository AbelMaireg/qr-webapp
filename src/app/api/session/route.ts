import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOrCreateSession, createSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
    // Check for existing session first
    const existingSessionId = await getOrCreateSession();

    if (existingSessionId) {
      return NextResponse.json({ sessionId: existingSessionId, isNew: false });
    }

    return NextResponse.json({ sessionId: null });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Failed to check session" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if session already exists
    const existingSessionId = await getOrCreateSession();

    if (existingSessionId) {
      return NextResponse.json({ sessionId: existingSessionId, isNew: false });
    }

    // Create new session only if none exists
    const sessionId = await createSession();

    const cookieStore = await cookies();
    cookieStore.set("qr-session-id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({ sessionId, isNew: true });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 },
    );
  }
}
