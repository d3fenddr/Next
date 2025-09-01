import CarForm from "@/components/CarForm";
import { readCars } from "@/lib/store";
import { notFound } from "next/navigation";

export default async function EditCarPage({ params }: { params: { id: string }}) {
  const cars = await readCars();
  const car = cars.find(c => c.id === params.id);
  if (!car) notFound();

  return (
    <main className="container">
      <h1 className="mb-4 text-2xl font-semibold">Edit car</h1>
      <CarForm
        mode="edit"
        id={car.id}
        initial={car}
      />
    </main>
  );
}
