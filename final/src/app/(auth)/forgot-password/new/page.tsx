"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSignIn, useClerk } from "@clerk/nextjs";

export default function NewPasswordPage() {
  const router = useRouter();

  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const { setActive } = useClerk();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const c = sessionStorage.getItem("fp_code") ?? "";
    setCode(c);
    if (!c) router.replace("/forgot-password");
  }, [router]);

  if (!signInLoaded) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!signIn) {
      setErr("Auth is not ready. Please try again.");
      return;
    }
    if (password.length < 8) {
      setErr("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      setErr("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (res.status === "complete") {
        sessionStorage.removeItem("fp_code");
        sessionStorage.removeItem("fp_email");

        router.replace("/login?reset=1");
        return;
      }

      setErr("Additional verification is required.");
    } catch (e: any) {
      const msg = e?.errors?.[0]?.longMessage ?? "Failed to reset password";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col">
        <header className="flex items-center justify-between px-8 pt-6">
          <div className="leading-tight">
            <div className="font-semibold text-slate-900">UiUxOtor</div>
            <div className="text-xs text-slate-500">ERP System</div>
          </div>
        </header>

        <main className="flex flex-1 px-8">
          <div className="mx-auto w-full max-w-md pt-16">
            <p className="text-sm text-slate-700">Choose a new password</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Set new password
            </h1>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block text-sm text-slate-700">New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none"
              />

              <label className="block text-sm text-slate-700">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none"
              />

              {err && <p className="text-sm text-red-600">{err}</p>}

              <div className="mt-2 flex items-center gap-3">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#14ADD6] to-[#384295] px-4 py-3 text-white disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Reset password"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <div className="relative hidden lg:block min-h-screen">
        <Image
          src="https://picsum.photos/2025"
          alt="Forgot password side"
          fill
          priority
          unoptimized
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 0vw"
        />
      </div>
    </div>
  );
}
