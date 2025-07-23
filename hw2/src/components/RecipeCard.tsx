'use client'

import Link from 'next/link'

type RecipeCardProps = {
  title: string
  description: string
  slug: string
}

export default function RecipeCard({ title, description, slug }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${slug}`}
      className="block border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition"
    >
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  )
}