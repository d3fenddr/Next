import { recipes } from '@/lib/data';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const filtered = recipes.filter(r => r.category === params.category);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Category: {params.category}</h1>
      {filtered.map(recipe => (
        <div key={recipe.slug} className="border p-4 mt-2 rounded">
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
}
