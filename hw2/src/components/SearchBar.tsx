'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/recipes/search?query=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Поиск рецептов..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Найти
      </button>
    </form>
  )
}
