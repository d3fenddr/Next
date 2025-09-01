"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("1234");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setMsg("✅");
        router.push("/products");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setMsg(`❌ Login error (${res.status})${data?.error ? `: ${data.error}` : ""}`);
      }
    } catch (err: any) {
      setMsg(`⚠️ Network error: ${err?.message ?? err}`);
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.status === 204) {
        setMsg("✅ You have logged out. Cookie has been removed.");
        router.refresh();
      } else {
        setMsg(`⚠️ Logout failed (${res.status})`);
      }
    } catch (err: any) {
      setMsg(`⚠️ Network error: ${err?.message ?? err}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-120px)] p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 className="text-2xl font-semibold tracking-tight">Products API</h1>

        <form onSubmit={handleLogin} className="w-full max-w-md border border-black/10 dark:border-white/15 rounded-xl p-4 flex flex-col gap-3">
          <div className="text-sm font-medium">Login (admin / 1234)</div>
          <label className="text-sm">
            <span className="block mb-1 opacity-70">Username</span>
            <input
              className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label className="text-sm">
            <span className="block mb-1 opacity-70">Password</span>
            <input
              className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={busy}
              className="rounded-md px-4 py-2 text-sm font-medium bg-foreground text-background hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              disabled={busy}
              className="rounded-md px-4 py-2 text-sm font-medium border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-60"
            >
              Logout
            </button>
          </div>
          {msg && <div className="text-sm">{msg}</div>}
        </form>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/products"
            className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] px-4 h-10 text-sm"
          >
            Open /products
          </Link>
          <Link
            href="/products?category=fruits&minPrice=1.0&sortBy=price&order=desc"
            className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] px-4 h-10 text-sm"
          >
            Example filter
          </Link>
          <Link
            href="/products?category=vegetables&minPrice=10"
            className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] px-4 h-10 text-sm"
          >
            Example not-found
          </Link>
        </div>
      </main>
    </div>
  );
}