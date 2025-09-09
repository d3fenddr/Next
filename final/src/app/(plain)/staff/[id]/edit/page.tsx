"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Gender, Staff } from "../../../../../types/staff";
import { getStaffById, updateStaff } from "../../../../../lib/staff-store";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [model, setModel] = useState<Staff | null>(null);

  useEffect(() => {
    const s = getStaffById(id);
    if (s) setModel(s);
  }, [id]);

  if (!model) return <div className="p-4 text-sm text-slate-500">Loading…</div>;

  const m: Staff = model;

  function set<K extends keyof Staff>(k: K, v: Staff[K]) {
    setModel((prev) => (prev ? ({ ...prev, [k]: v } as Staff) : prev));
  }

  function onSelectPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => set("photo", String(r.result));
    r.readAsDataURL(f);
  }

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    updateStaff(m.id, m);
    router.push(
      `/staff/success?t=updated&name=${encodeURIComponent(`${m.firstName} ${m.lastName}`)}`
    );
  }

  function onAssign(e: React.FormEvent) {
    e.preventDefault();
    updateStaff(m.id, { role: m.role });
    router.push(
      `/staff/success?t=updated&name=${encodeURIComponent(`${m.firstName} ${m.lastName}`)}`
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-slate-900">Edit Staff Profile</div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <form onSubmit={onSave} className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-6">
            <div className="grid place-items-center">
              <label className="grid h-56 w-56 cursor-pointer place-items-center rounded-full border-2 border-dashed border-slate-300 bg-white">
                {m.photo ? (
                  <img src={m.photo} alt="" className="h-56 w-56 rounded-full object-cover" />
                ) : (
                  <div className="text-center text-sm text-slate-500">
                    <div className="mb-2 text-3xl">📷</div>
                    <div>Upload photo</div>
                    <div className="mt-2 text-xs text-slate-400">JPG, JPEG, PNG · max 2MB</div>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={onSelectPhoto} className="hidden" />
              </label>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="First name" value={m.firstName} onChange={(v) => set("firstName", v)} />
              <Input label="Last name" value={m.lastName} onChange={(v) => set("lastName", v)} />
              <Input label="Email address" value={m.email ?? ""} onChange={(v) => set("email", v)} />
              <Input label="Phone number" value={m.phone} onChange={(v) => set("phone", v)} />
              <Select
                label="Gender"
                value={m.gender}
                onChange={(v) => set("gender", v as Gender)}
                options={["Male", "Female"]}
              />
              <Select
                label="Role"
                value={m.role}
                onChange={(v) => set("role", v)}
                options={["Admin", "I.T", "P.M", "None"]}
              />
              <Input label="Staff ID" value={m.staffId} onChange={(v) => set("staffId", v)} />
              <Select
                label="Designation"
                value={m.designation}
                onChange={(v) => set("designation", v)}
                options={[
                  "Human Resources",
                  "Operations",
                  "Project Management",
                  "Customer Service",
                  "Cleaning",
                  "Security",
                ]}
              />
              <Input
                label="Official email"
                value={m.officialEmail ?? ""}
                onChange={(v) => set("officialEmail", v)}
              />
            </div>
            <div className="mt-2">
              <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
                Edit Profile
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <form onSubmit={onAssign} className="grid grid-cols-1 gap-4 sm:grid-cols-[240px_1fr_200px]">
          <Input label="User ID" value={m.staffId} onChange={() => {}} disabled />
          <Select
            label="Role"
            value={m.role}
            onChange={(v) => set("role", v)}
            options={["Admin", "I.T", "P.M", "None"]}
          />
          <div className="flex items-end">
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-slate-700">{label}</span>
      <input
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 rounded-lg border px-3 outline-none ${
          disabled ? "bg-slate-50 border-slate-200 text-slate-400" : "bg-white border-slate-200"
        }`}
      />
    </label>
  );
}
function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
