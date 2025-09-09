"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Staff } from "../../../types/staff";
import { STAFF_BASE } from "../../../lib/staff-data";
import { getAllStaff } from "../../../lib/staff-store";

export default function Page() {
  // 👇 Стабильный снапшот для SSR/первого клиента
  const [data, setData] = useState<Staff[]>(STAFF_BASE);
  const [q, setQ] = useState("");

  // 👇 Уже на клиенте подменяем на base+extras+overrides
  useEffect(() => {
    setData(getAllStaff());
  }, []);

  const rows = useMemo(() => {
    const qq = q.toLowerCase();
    return data
      .filter(
        (s) =>
          !q ||
          s.firstName.toLowerCase().includes(qq) ||
          s.lastName.toLowerCase().includes(qq) ||
          s.staffId.toLowerCase().includes(qq) ||
          s.role.toLowerCase().includes(qq) ||
          s.designation.toLowerCase().includes(qq)
      )
      .map((s, i) => ({ sn: String(i + 1).padStart(2, "0"), ...s }));
  }, [q, data]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">All Staff</div>
          <div className="text-xs text-slate-500">View, search for and add new staff</div>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Quick search a staff"
            className="h-9 w-64 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none"
          />
          <Link href="/staff/create" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
            Add New Staff
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <div className="mb-4 text-base font-semibold text-slate-900">All Staff</div>
        <div className="scroll-area max-h-[540px] overflow-y-scroll pr-2">
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-16" />
              <col className="w-[12%]" /><col className="w-[14%]" /><col className="w-[10%]" />
              <col className="w-[12%]" /><col className="w-[16%]" /><col className="w-[10%]" />
              <col className="w-[16%]" /><col className="w-[10%]" />
            </colgroup>
            <thead className="text-slate-500">
              <tr className="text-left h-10">
                <Th>S/N</Th><Th>First Name</Th><Th>Last Name</Th><Th>Gender</Th>
                <Th>Staff ID</Th><Th>Phone Number</Th><Th>Role</Th><Th>Designation</Th><Th>Action</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id} className="h-12 text-slate-700">
                  <Td>{r.sn}</Td>
                  <Td className="truncate">{r.firstName}</Td>
                  <Td className="truncate">{r.lastName}</Td>
                  <Td>{r.gender}</Td>
                  <Td className="truncate">{r.staffId}</Td>
                  <Td className="truncate">{r.phone}</Td>
                  <Td className="truncate">{r.role}</Td>
                  <Td className="truncate">{r.designation}</Td>
                  <Td><Link href={`/staff/${r.id}/edit`} className="text-indigo-600 hover:underline">Edit</Link></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 text-xs font-medium uppercase tracking-wide">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 ${className}`}>{children}</td>;
}
