import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json().catch(() => ({} as any));

  const isOk = username === "admin" && password === "1234";
  if (!isOk) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("auth", "token123", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}