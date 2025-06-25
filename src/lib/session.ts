import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "./prisma";

export async function getOrCreateSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("qr-session-id")?.value;

  if (sessionId) {
    const session = await prisma.client_sessions.findUnique({
      where: { sessionId },
    });

    if (session) {
      return sessionId;
    }
  }

  return null;
}

export async function createSession(): Promise<string> {
  const sessionId = uuidv4();

  await prisma.client_sessions.create({
    data: { sessionId },
  });

  return sessionId;
}

export async function getSessionHistory(sessionId: string) {
  return await prisma.qrc_gen_logs.findMany({
    where: { sessionId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}
