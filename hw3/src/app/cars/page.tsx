"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Car = {
  id: string;
  make: string;
  model: string;
  price: number;
};

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/cars", { cache: "no-store" });
    const data = await res.json();
    setCars(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    await fetch(`/api/cars/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Cars</h1>
        <Link href="/add" style={{ background: "black", color: "white", padding: "10px 14px", borderRadius: 12 }}>
          Add Car
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : cars.length === 0 ? (
        <p style={{ color: "#4b5563" }}>Empty. Add something</p>
      ) : (
        <ul style={{ display: "grid", gap: 8 }}>
          {cars.map((c) => (
            <li key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
              <div style={{ fontWeight: 500 }}>
                {c.make} {c.model} — <span style={{ color: "#4b5563" }}>${c.price}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Link href={`/edit/${c.id}`} style={{ color: "#2563eb" }}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(c.id)} style={{ color: "#dc2626" }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
