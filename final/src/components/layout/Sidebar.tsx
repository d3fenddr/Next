"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../../lib/nav";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600" />
        <div className="leading-tight">
          <div className="font-semibold text-slate-900">UiUxOtor</div>
          <div className="text-xs text-slate-500">ERP System</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-2 pb-4">
        {NAV_ITEMS.map((it) => {
          const active = it.exact ? pathname === it.href : pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <Link
              key={it.label}
              href={it.href}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                active ? "bg-[#E9F3FF] text-slate-900" : "text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
