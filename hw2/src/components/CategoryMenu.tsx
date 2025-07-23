'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

type CategoryMenuProps = {
  categories: string[]
}

export default function CategoryMenu({ categories }: CategoryMenuProps) {
  const pathname = usePathname()

  return (
    <nav className="flex gap-4 flex-wrap mb-6">
      <Link
        href="/recipes"
        className={clsx('px-4 py-2 rounded', {
          'bg-blue-600 text-white': pathname === '/recipes',
          'bg-gray-100 hover:bg-gray-200': pathname !== '/recipes',
        })}
      >
        Все
      </Link>

      {categories.map((category) => (
        <Link
          key={category}
          href={`/recipes/category/${category}`}
          className={clsx('px-4 py-2 rounded', {
            'bg-blue-600 text-white': pathname === `/recipes/category/${category}`,
            'bg-gray-100 hover:bg-gray-200': pathname !== `/recipes/category/${category}`,
          })}
        >
          {category}
        </Link>
      ))}
    </nav>
  )
}
