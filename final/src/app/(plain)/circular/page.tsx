"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CIRCULARS } from "../../../lib/circular-data";
import type { CircularStatus, Circular } from "../../../types/circular";
import { getExtraCirculars } from "../../../lib/circular-store";

export default function Page() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<CircularStatus | "All">("All");
  const [extra, setExtra] = useState<Circular[]>([]);

  useEffect(() => {
    setExtra(getExtraCirculars());
  }, []);

  const rows = useMemo(() => {
    const all = [...extra, ...CIRCULARS];
    const filtered = all.filter((r) => {
      const okS = status === "All" ? true : r.status === status;
      const qq = q.toLowerCase();
      const okQ =
        !q ||
        r.title.toLowerCase().includes(qq) ||
        r.department.toLowerCase().includes(qq) ||
        r.createdBy.toLowerCase().includes(qq);
      return okS && okQ;
    });
    return filtered.map((r, i) => ({ ...r, sn: String(i + 1).padStart(2, "0") }));
  }, [q, status, extra]);

  const totalCount = extra.length + CIRCULARS.length;

  return (
    <div className="h-[calc(100vh-48px)] overflow-hidden">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-lg font-semibold text-slate-900">Circulars</div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700">
            Total: {totalCount}
          </span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search"
                 className="h-9 w-56 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none" />
          <select value={status} onChange={(e) => setStatus(e.target.value as any)}
                  className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none">
            <option value="All">All</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          <Link href="/circular/create" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">New Circular</Link>
        </div>
      </div>

      <div className="flex h-[calc(100%-52px)] flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <div className="mb-4 text-base font-semibold text-slate-900">All Circulars</div>
        <div className="scroll-area h-full overflow-y-scroll pr-2">
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-16" /><col /><col className="w-40" /><col className="w-40" /><col className="w-32" /><col className="w-28" />
            </colgroup>
            <thead className="text-slate-500">
              <tr className="text-left h-10"><Th>S/N</Th><Th>Title</Th><Th>Department</Th><Th>Created By</Th><Th>Date</Th><Th>Status</Th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id} className="h-12 text-slate-700">
                  <Td>{r.sn}</Td>
                  <Td className="truncate">{r.title}</Td>
                  <Td className="truncate">{r.department}</Td>
                  <Td className="truncate">{r.createdBy}</Td>
                  <Td>{r.date}</Td>
                  <Td><StatusChip status={r.status} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) { return <th className="px-3 text-xs font-medium uppercase tracking-wide">{children}</th>; }
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <td className={`px-3 ${className}`}>{children}</td>; }
function StatusChip({ status }: { status: CircularStatus }) {
  const cls = status === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600";
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs ${cls}`}>{status}</span>;
}
