import { promises as fs } from "fs";
import path from "path";
import { Car } from "@/types";

const dataPath = path.join(process.cwd(), "data", "cars.json");

async function ensureFile() {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, "[]", "utf8");
  }
}

export async function readCars(): Promise<Car[]> {
  await ensureFile();
  const raw = await fs.readFile(dataPath, "utf8");
  return JSON.parse(raw) as Car[];
}

export async function writeCars(cars: Car[]) {
  await ensureFile();
  await fs.writeFile(dataPath, JSON.stringify(cars, null, 2), "utf8");
}
