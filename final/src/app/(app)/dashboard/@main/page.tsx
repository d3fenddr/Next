import { MEMOS, VOUCHERS } from "../../../../lib/dashboard-data";

export default function Page() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi title="Total number of staff" value="250" hint="12 more than last quarter" />
        <Kpi title="Total application" value="100" variant="danger" hint="0.2% lower than last quarter" />
        <Kpi title="Total projects" value="10" hint="2% more than last quarter" />
        <Kpi title="Total departments" value="10" />
      </div>

      <Card title="Memo">
        <ScrollArea>
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-16" />
              <col className="w-[38%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead className="text-slate-500">
              <tr className="text-left">
                <Th>S/N</Th><Th>Memo Title</Th><Th>Sent From</Th><Th>Sent To</Th><Th>Status</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MEMOS.map((r) => (
                <tr key={r.sn} className="text-slate-700">
                  <Td>{r.sn}</Td>
                  <Td className="truncate">{r.title}</Td>
                  <Td className="truncate">{r.from}</Td>
                  <Td className="truncate">{r.to}</Td>
                  <Td><StatusChip type={r.status} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </Card>

      <Card title="Payment Vouchers">
        <ScrollArea>
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-16" />
              <col />
              <col className="w-40" />
              <col className="w-28" />
            </colgroup>
            <thead className="text-slate-500">
              <tr className="text-left">
                <Th>S/N</Th><Th>Subject</Th><Th>Date</Th><Th>Status</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {VOUCHERS.map((r) => (
                <tr key={r.sn} className="text-slate-700">
                  <Td>{r.sn}</Td>
                  <Td className="truncate">{r.subject}</Td>
                  <Td>{r.date}</Td>
                  <Td><StatusChip type={r.status} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </Card>
    </div>
  );
}

function Kpi({ title, value, hint, variant }: { title: string; value: string; hint?: string; variant?: "danger" | "default" }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="text-3xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{title}</div>
      {hint ? (
        <div className={`mt-3 inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs ${variant === "danger" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {variant === "danger" ? "↓" : "↑"} {hint}
        </div>
      ) : null}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 text-base font-semibold text-slate-900">{title}</div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

function ScrollArea({ children }: { children: React.ReactNode }) {
  return <div className="scroll-area h-full overflow-y-auto pr-2">{children}</div>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 text-xs font-medium uppercase tracking-wide">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-3 ${className}`}>{children}</td>;
}
function StatusChip({ type }: { type: "Approved" | "Pending" }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs ${type === "Approved" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
      {type}
    </span>
  );
}
