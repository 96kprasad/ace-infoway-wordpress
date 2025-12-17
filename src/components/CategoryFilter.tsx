'use client'

import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCategory } from '@/store/categorySlice'
import { RootState } from '@/store'
import { CategoryFilterProps } from '@/types/types'

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const dispatch = useDispatch()
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory)

  const handleCategoryChange = (categoryId: number | null) => {
    dispatch(setSelectedCategory(categoryId))
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}