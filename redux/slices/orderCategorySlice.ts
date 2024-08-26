"use client";
import { CategoryItems, NestedItems } from '@/components/types/Table';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  data: CategoryItems[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (storeId: string) => {
    const res = await fetch(`/api/stores/${storeId}/category?storeId=${storeId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await res.json();
    return data.allCategories;
  }
);
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoryItems[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch categories';
      });
  },
});

export default categorySlice.reducer;
