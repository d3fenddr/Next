"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

type Phase = "email" | "code";

export default function ForgotPasswordClerkForm() {
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();

  const [phase, setPhase] = useState<Phase>("email");

  const [email, setEmail] = useState<string>("");
  const [savedEmail, setSavedEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  if (!isLoaded) return null;

  async function onSubmitEmail(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    setLoading(true);
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setSavedEmail(email);
      setEmail("");
      setOk("We sent a 6-digit verification code to your email.");
      setPhase("code");
    } catch (e: any) {
      const msg = e?.errors?.[0]?.longMessage ?? "Failed to send reset code";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmitCode(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    sessionStorage.setItem("fp_code", code);
    sessionStorage.setItem("fp_email", savedEmail);
    router.push("/forgot-password/new");
  }

  return (
    <div className="mt-6 space-y-4">
      {phase === "email" && (
        <form onSubmit={onSubmitEmail} className="space-y-4">
          <label className="mb-2 block text-sm text-slate-700">Email address</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none"
          />

          {err && <p className="text-sm text-red-600">{err}</p>}

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#14ADD6] to-[#384295] px-4 py-3 text-white"
          >
            {loading ? "Sending..." : "Send reset code"}
          </button>
        </form>
      )}

      {phase === "code" && (
        <form onSubmit={onSubmitCode} className="space-y-4">
          {ok && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {ok} <span className="font-medium">{savedEmail}</span>
            </div>
          )}

          <label className="mb-2 block text-sm text-slate-700">Enter code</label>
          <input
            name="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none tracking-widest"
          />

          {err && <p className="text-sm text-red-600">{err}</p>}

          <div className="flex items-center gap-3">
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#14ADD6] to-[#384295] px-4 py-3 text-white">
              Continue
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
