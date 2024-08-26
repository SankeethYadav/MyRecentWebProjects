// redux/store.ts
"use client";
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/orderCategorySlice';
import orderReducer from './slices/createOrderSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
