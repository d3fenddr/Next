"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addCircular } from "../../../../lib/circular-store";
import type { Circular } from "../../../../types/circular";

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("HR");
  const [status, setStatus] = useState<"Published" | "Draft">("Published");
  const [desc, setDesc] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    const item: Omit<Circular, "sn"> = {
      id: `c-${now.getTime()}`,
      title,
      department,
      createdBy: "You",
      date: `${dd}/${mm}/${yyyy}`,
      status,
    };
    addCircular(item);
    router.push("/circular/success");
  }

return (
  <div className="min-h-[calc(100vh-48px)]">
    <div className="mb-4">
      <h1 className="text-lg font-semibold text-slate-900">Create Circular</h1>
    </div>

    <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-700">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 outline-none"
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="text-slate-700">Department</span>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 outline-none"
            >
              <option>HR</option><option>IT</option><option>Finance</option>
              <option>Operations</option><option>Management</option>
              <option>Logistics</option><option>Procurement</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-slate-700">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 outline-none"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </label>
        </div>

        <label className="grid gap-1 text-sm">
          <span className="text-slate-700">Description</span>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={6}
            className="rounded-lg border border-slate-200 bg-white p-3 outline-none"
          />
        </label>

        <div className="mt-2 flex items-center gap-3">
          <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
            Save
          </button>
          <button
            type="button"
            onClick={() => router.push("/circular")}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
}