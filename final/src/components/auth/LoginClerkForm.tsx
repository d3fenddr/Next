"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useClerk, useSignIn } from "@clerk/nextjs";
import PasswordInput from "./PasswordInput";

export default function LoginClerkForm() {
  const { isLoaded, signIn } = useSignIn();
  const { isSignedIn } = useAuth();
  const { setActive } = useClerk();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (isSignedIn) router.replace("/dashboard");
  }, [isSignedIn, router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLoaded) return;
    setErr("");
    const password = (e.currentTarget as HTMLFormElement).password.value as string;
    try {
      const res = await signIn.create({ identifier: email.trim(), password });
      if (res.status === "complete" && res.createdSessionId) {
        await setActive({ session: res.createdSessionId });
        router.replace("/dashboard");
        return;
      }
      if (res.status === "needs_first_factor" || res.status === "needs_second_factor") {
        setErr("Additional verification required.");
        return;
      }
      setErr("Could not sign in.");
    } catch (e: any) {
      const code = e?.errors?.[0]?.code;
      const msg = e?.errors?.[0]?.message;
      if (code === "session_exists") {
        router.replace("/dashboard");
        return;
      }
      setErr(msg || "Invalid credentials");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
      <div>
        <label className="mb-2 block text-sm text-slate-700">Email address</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Enter email address"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-300"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-slate-700">Password</label>
        <PasswordInput />
      </div>
      <div id="clerk-captcha" className="h-0 overflow-visible" />
      {err ? <div className="text-sm text-red-600">{err}</div> : null}
      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-[#14ADD6] to-[#384295] px-4 py-3 text-white shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14ADD6]"
      >
        Sign In
      </button>
    </form>
  );
}
