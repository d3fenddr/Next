import { notFound } from "next/navigation";
import { recipes } from "@/lib/data";

type Params = {
  params: {
    slug: string;
  };
};

export default function RecipePage({ params }: Params) {
  if (params.slug === "chocolate-cake") {
    throw new Error("Error Test");
  }

  const recipe = recipes.find((r) => r.slug === params.slug);

  if (!recipe) return notFound();

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <p className="text-gray-600">{recipe.description}</p>

      <section>
        <h2 className="text-lg font-semibold mt-4 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-4 mb-2">Steps</h2>
        <ol className="list-decimal list-inside">
          {recipe.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}