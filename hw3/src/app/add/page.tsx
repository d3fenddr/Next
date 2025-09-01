import CarForm from "@/components/CarForm";

export default function AddCarPage() {
  return (
    <main className="container">
      <h1 className="mb-4 text-2xl font-semibold">Add car</h1>
      <CarForm mode="create" />
    </main>
  );
}