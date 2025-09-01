"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Car } from "@/types";

type Props = {
  mode: "create" | "edit";
  initial?: Partial<Car>;
  id?: string;
};

export default function CarForm({ mode, initial = {}, id }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    make: initial.make ?? "",
    model: initial.model ?? "",
    year: initial.year?.toString() ?? "",
    color: initial.color ?? "",
    price: initial.price?.toString() ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setErr(null);
  }, [form]);

  const onChange = (k: string, v: string) =>
    setForm(prev => ({ ...prev, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const url = mode === "create" ? "/api/cars" : `/api/cars/${id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          make: form.make.trim(),
          model: form.model.trim(),
          year: Number(form.year),
          color: form.color.trim(),
          price: Number(form.price),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `${res.statusText}`);
      }
      router.push("/cars");
      router.refresh();
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Make</span>
          <input
            className="input"
            value={form.make}
            onChange={(e) => onChange("make", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Model</span>
          <input
            className="input"
            value={form.model}
            onChange={(e) => onChange("model", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Year</span>
          <input
            className="input"
            type="number"
            min={1900}
            max={2100}
            value={form.year}
            onChange={(e) => onChange("year", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Colour</span>
          <input
            className="input"
            value={form.color}
            onChange={(e) => onChange("color", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm text-gray-600">Price</span>
          <input
            className="input"
            type="number"
            min={0}
            step="0.01"
            value={form.price}
            onChange={(e) => onChange("price", e.target.value)}
            required
          />
        </label>
      </div>

      {err && <p className="rounded bg-red-50 p-2 text-sm text-red-700">{err}</p>}

      <div className="flex gap-3">
        <button
          disabled={loading}
          className="btn-primary"
          type="submit"
        >
          {mode === "create" ? "Add" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
