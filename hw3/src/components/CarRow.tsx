"use client";
import Link from "next/link";
import { useTransition } from "react";

export default function CarRow({
  car: { id, make, model, price },
  onDelete,
}: {
  car: { id: string; make: string; model: string; price: number };
  onDelete: (id: string) => Promise<void>;
}) {
  const [isPending, start] = useTransition();

  return (
    <li className="flex items-center justify-between rounded border p-3">
      <div className="font-medium">
        {make} {model} — <span className="text-gray-600">${price}</span>
      </div>
      <div className="flex gap-2">
        <Link className="link" href={`/edit/${id}`}>Edit</Link>
        <button
          className="text-red-600 hover:underline disabled:opacity-50"
          disabled={isPending}
          onClick={() => start(() => onDelete(id))}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
