import { notFound } from "next/navigation"
import { recipes } from "@/lib/data"
import RecipeCard from "@/components/RecipeCard"
import CategoryMenu from "@/components/CategoryMenu"
import SearchBar from "@/components/SearchBar"

type Params = {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: Params) {
  const { category } = params

  const categories = Array.from(new Set(recipes.map((r) => r.category)))

  const filteredRecipes = recipes.filter((r) => r.category === category)

  if (filteredRecipes.length === 0) {
    return notFound()
  }

  const title = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Category: {title}</h1>

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