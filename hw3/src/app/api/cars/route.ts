import { NextRequest, NextResponse } from "next/server";
import { readCars, writeCars } from "@/lib/store";
import { Car } from "@/types";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  const cars = await readCars();
  return NextResponse.json(cars, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const required = ["make", "model", "year", "color", "price"];
    for (const k of required) {
      if (body[k] === undefined || body[k] === null || body[k] === "")
        return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
    }

    const now = new Date().toISOString();
    const newCar: Car = {
      id: randomUUID(),
      make: String(body.make),
      model: String(body.model),
      year: Number(body.year),
      color: String(body.color),
      price: Number(body.price),
      createdAt: now,
      updatedAt: now,
    };

    const cars = await readCars();
    cars.push(newCar);
    await writeCars(cars);
    return NextResponse.json(newCar, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
