import { recipes } from "@/lib/data"
import RecipeCard from "@/components/RecipeCard"
import CategoryMenu from "@/components/CategoryMenu"
import SearchBar from "@/components/SearchBar"
import { notFound } from "next/navigation"

type SearchPageProps = {
  searchParams?: {
    query?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.query?.toLowerCase() ?? ""
  const categories = Array.from(new Set(recipes.map((r) => r.category)))
  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(query)
  )

  if (query && filteredRecipes.length === 0) {
    return notFound()
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {query ? `Search results for "${query}"` : "Search recipes"}
      </h1>
      <SearchBar />
      <CategoryMenu categories={categories} />
      <div className="grid gap-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.slug}
            title={recipe.title}
            description={recipe.description}
            slug={recipe.slug}
          />
        ))}
      </div>
    </main>
  )
}