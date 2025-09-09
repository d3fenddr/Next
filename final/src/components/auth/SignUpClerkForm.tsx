"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk, useSignUp } from "@clerk/nextjs";
import PasswordInput from "./PasswordInput";

export default function SignUpClerkForm() {
  const { isLoaded, signUp } = useSignUp();
  const { setActive } = useClerk();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"collect" | "verify">("collect");
  const [err, setErr] = useState("");

  async function onCollect(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setErr("");
    const password = (e.currentTarget as HTMLFormElement).password.value as string;
    const res = await signUp.create({ emailAddress: email, password }).catch(() => null);
    if (!res) { setErr("Sign up failed"); return; }
    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    setStep("verify");
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setErr("");
    const res = await signUp.attemptEmailAddressVerification({ code }).catch(() => null);
    if (!res) { setErr("Invalid code"); return; }
    if (res.status === "complete" && res.createdSessionId) {
      await setActive({ session: res.createdSessionId });
      router.replace("/dashboard");
      return;
    }
    setErr("Verification pending");
  }

  if (step === "verify") {
    return (
      <form key="verify" onSubmit={onVerify} className="mt-8 space-y-6" noValidate>
        <div>
          <label className="mb-2 block text-sm text-slate-700">Enter the code sent to {email}</label>
          <input
            name="code"
            type="text"
            inputMode="numeric"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-300"
          />
        </div>
        {err ? <div className="text-sm text-red-600">{err}</div> : null}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-[#14ADD6] to-[#384295] px-4 py-3 text-white shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14ADD6]"
        >
          Verify
        </button>
      </form>
    );
  }

  return (
    <form key="collect" onSubmit={onCollect} className="mt-8 space-y-6" noValidate>
      <div>
        <label className="mb-2 block text-sm text-slate-700">Email address</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        Create account
      </button>
    </form>
  );
}
