import { recipes } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function RecipeDetail({ params }: { params: { slug: string } }) {
  const recipe = recipes.find(r => r.slug === params.slug);
  if (!recipe) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <p className="italic mb-2">{recipe.category}</p>

      <h2 className="text-lg font-semibold mt-4">Ingredients</h2>
      <ul className="list-disc ml-6">
        {recipe.ingredients.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <h2 className="text-lg font-semibold mt-4">Steps</h2>
      <ol className="list-decimal ml-6">
        {recipe.steps.map((step, idx) => <li key={idx}>{step}</li>)}
      </ol>
    </div>
  );
}
