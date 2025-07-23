import Link from 'next/link';
import { recipes } from '@/lib/data';

export default function RecipesPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
      <div className="grid gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.slug} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p>{recipe.description}</p>
            <Link href={`/recipes/${recipe.slug}`} className="text-blue-500 mt-2 inline-block">
              VIew more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}