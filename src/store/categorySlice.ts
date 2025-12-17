import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '@/types/types'

interface CategoryState {
  selectedCategory: number | null
  categories: Category[]
}

const initialState: CategoryState = {
  selectedCategory: null,
  categories: [],
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload
    },
  },
})

export const { setSelectedCategory, setCategories } = categorySlice.actions
export default categorySlice.reducer