import { NextRequest, NextResponse } from "next/server";
import { readCars, writeCars } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cars = await readCars();
  const car = cars.find(c => c.id === params.id);
  if (!car) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(car, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const payload = await req.json();
  const cars = await readCars();
  const idx = cars.findIndex(c => c.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const prev = cars[idx];
  const updated = {
    ...prev,
    ...payload,
    year: payload.year !== undefined ? Number(payload.year) : prev.year,
    price: payload.price !== undefined ? Number(payload.price) : prev.price,
    updatedAt: new Date().toISOString(),
  };

  cars[idx] = updated;
  await writeCars(cars);
  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cars = await readCars();
  const idx = cars.findIndex(c => c.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [removed] = cars.splice(idx, 1);
  await writeCars(cars);
  return NextResponse.json(removed, { status: 200 });
}
