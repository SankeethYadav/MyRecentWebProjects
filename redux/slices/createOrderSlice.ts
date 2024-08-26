// redux/slices/createOrderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderItemState {
  cost: number;
  onHandQnt: number;
  orderQnt: number;
}

interface OrderState {
  items: { [key: string]: OrderItemState };
  totalCosts: { [key: string]: number };
}

const initialState: OrderState = {
  items: {},
  totalCosts: {},
};

const calculateTotalCost = (item: OrderItemState) => (item.onHandQnt + item.orderQnt) * item.cost;

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCost: (state, action: PayloadAction<{ id: string; cost: number }>) => {
      const { id, cost } = action.payload;
      if (!state.items[id]) {
        state.items[id] = { cost, onHandQnt: 0, orderQnt: 0 };
      } else {
        state.items[id].cost = cost;
      }
      state.totalCosts[id] = calculateTotalCost(state.items[id]);
    },
    setOnHandQuantity: (state, action: PayloadAction<{ id: string; onHandQnt: number }>) => {
      const { id, onHandQnt } = action.payload;
      if (!state.items[id]) {
        state.items[id] = { cost: 0, onHandQnt, orderQnt: 0 };
      } else {
        state.items[id].onHandQnt = onHandQnt;
      }
      state.totalCosts[id] = calculateTotalCost(state.items[id]);
    },
    increment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].orderQnt += 1;
        state.totalCosts[id] = calculateTotalCost(state.items[id]);
      }
    },
    decrement: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items[id] && state.items[id].orderQnt > 0) {
        state.items[id].orderQnt -= 1;
        state.totalCosts[id] = calculateTotalCost(state.items[id]);
      }
    },
    setQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        state.items[id].orderQnt = quantity;
        state.totalCosts[id] = calculateTotalCost(state.items[id]);
      }
    },
  },
});

export const { setCost, setOnHandQuantity, increment, decrement, setQuantity } = orderSlice.actions;

export default orderSlice.reducer;
