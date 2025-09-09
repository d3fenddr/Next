"use client";

import { useEffect, useRef, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";

export default function Header() {
  const { user, isLoaded } = useUser();
  const displayName =
    (user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.fullName) || " ";

  return (
    <div className="sticky top-0 z-10 bg-[#F6F8FC]">
      <div className="mx-auto flex w-full max-w-[1200px] items-start justify-between gap-4 px-6 py-5">
        <div>
          <div className="text-lg font-semibold text-slate-900">
            {isLoaded ? <>Welcome, 👋</> : <span className="inline-block h-5 w-40 animate-pulse rounded bg-slate-200" />}
          </div>
          <div className="text-xs text-slate-500">{formatHumanDate(new Date())}</div>
        </div>
        <ProfileMenu nameOverride={displayName} />
      </div>
    </div>
  );
}

function ProfileMenu({ nameOverride }: { nameOverride?: string }) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const name = nameOverride || "User";
  const role = ((user?.publicMetadata as any)?.role as string) || "Your profile";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
      >
        <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-slate-200">
          {user?.imageUrl ? <img src={user.imageUrl} alt="" className="h-full w-full object-cover" /> : null}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-sm font-medium text-slate-900">{name}</span>
          <span className="block text-[14px] text-slate-500">{role}</span>
        </span>
        <svg className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6" /></svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200">
          <MenuItem icon={<UserIcon />} label="Profile" onClick={() => setOpen(false)} />
          <MenuItem icon={<SettingsIcon />} label="Settings" onClick={() => setOpen(false)} />
          <div className="my-1 h-px bg-slate-100" />
          <MenuItem icon={<LogoutIcon />} label="Logout" onClick={() => signOut({ redirectUrl: "/login" })} />
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50">
      <span className="grid h-5 w-5 place-items-center text-slate-500">{icon}</span>
      {label}
    </button>
  );
}

function UserIcon() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M5.5 20a7 7 0 0 1 13 0"/></svg>; }
function SettingsIcon() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 1-2 0 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 1 0-2 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 1 2 0 1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.24.31.43.65.6 1 .17.35.26.73.26 1.12s-.09.77-.26 1.12c-.17.35-.36.69-.6 1Z"/></svg>; }
function LogoutIcon() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>; }

function formatHumanDate(d: Date) {
  const day = d.getDate();
  const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const year = d.getFullYear();
  return `Today is ${weekday}, ${day}${suffix} ${month} ${year}.`;
}
