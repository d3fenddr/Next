import { STAFF, APPLICATIONS } from "../../../../lib/dashboard-data";

export default function Page() {
  return (
    <div className="h-full grid grid-rows-[1fr_1fr] gap-6 overflow-hidden">
      <Card title="Staff List">
        <ScrollArea>
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-16" />
              <col className="w-[42%]" />
              <col className="w-[22%]" />
              <col />
            </colgroup>
            <thead className="text-slate-500">
              <tr className="text-left">
                <Th>S/N</Th><Th>Staff Name</Th><Th>Staff Role</Th><Th>Designation</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STAFF.map((r) => (
                <tr key={r.sn} className="text-slate-700">
                  <Td>{r.sn}</Td>
                  <Td className="truncate">{r.name}</Td>
                  <Td className="truncate">{r.role}</Td>
                  <Td className="truncate">{r.designation}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </Card>

      <Card title="Staff Applications Card">
        <div className="text-sm text-slate-700">{APPLICATIONS.total} Total applications</div>
        <div className="mt-4 flex items-center gap-6">
          <Donut approved={APPLICATIONS.approved} pending={APPLICATIONS.pending} rejected={APPLICATIONS.rejected} />
          <ul className="space-y-2 text-sm">
            <Legend color="#10B981" label="Approved" value={APPLICATIONS.approved} />
            <Legend color="#F59E0B" label="Pending" value={APPLICATIONS.pending} />
            <Legend color="#EF4444" label="Rejected" value={APPLICATIONS.rejected} />
          </ul>
        </div>
      </Card>
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
function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 text-xs font-medium uppercase tracking-wide">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-3 ${className}`}>{children}</td>;
}
function ScrollArea({ children }: { children: React.ReactNode }) {
  return <div className="scroll-area h-full overflow-y-scroll pr-2">{children}</div>;
}

function Donut({ approved, pending, rejected }: { approved: number; pending: number; rejected: number }) {
  const total = approved + pending + rejected;
  const a = (approved / total) * 360;
  const p = (pending / total) * 360;
  const style: React.CSSProperties = { background: `conic-gradient(#10B981 0 ${a}deg, #F59E0B ${a}deg ${a + p}deg, #EF4444 ${a + p}deg 360deg)` };
  return (
    <div className="relative h-36 w-36">
      <div className="h-full w-full rounded-full" style={style} />
      <div className="absolute inset-3 rounded-full bg-white" />
    </div>
  );
}
function Legend({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <li className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-slate-600">{value} {label}</span>
    </li>
  );
}
