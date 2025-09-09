"use client";

import { useState } from "react";

type Props = {
  name?: string;
  placeholder?: string;
  className?: string;
};

export default function PasswordInput({
  name = "password",
  placeholder = "••••••••••••",
  className = "",
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none focus:border-slate-300 ${className}`}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100"
      >
        {show ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
            <path d="M3 3l18 18" strokeLinecap="round" />
            <path
              d="M6.8 6.8A11 11 0 0112 5c5 0 9 4 10 7-.9 2.1-2.9 4.3-5.4 5.6M9.9 9.9A3 3 0 0012 15a3 3 0 002.1-.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
