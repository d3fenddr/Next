'use client';
import { useEffect, useState } from 'react';
import { recipes } from '@/lib/data';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(recipes);

  useEffect(() => {
    const res = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(res);
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Recipes</h1>
      <input
        type="text"
        placeholder="Search by title..."
        className="border px-2 py-1 w-full mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.map(recipe => (
        <div key={recipe.slug} className="border p-4 mb-2 rounded">
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
}