import { recipes } from "@/lib/data";
import RecipeCard from "@/components/RecipeCard";
import CategoryMenu from "@/components/CategoryMenu";
import SearchBar from "@/components/SearchBar";

export default function RecipesPage() {
  const categories = Array.from(new Set(recipes.map((r) => r.category)));

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">All recipes</h1>

      <SearchBar />
      <CategoryMenu categories={categories} />

      <div className="grid gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.slug}
            title={recipe.title}
            description={recipe.description}
            slug={recipe.slug}
          />
        ))}
      </div>
    </main>
  );
}
