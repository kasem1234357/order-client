import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    totalVAT: 0,
  },
  reducers: {
    addToCart: (state: any, action: any) => {
      const item = state.items.find((i: any) => i.id === action.payload.id);
      if (item) {
        state.totalQuantity += action.payload.quantity - item.quantity;
        state.totalPrice +=
          action.payload.quantity * action.payload.price -
          item.quantity * item.price;

        state.totalVAT +=
          action.payload.quantity * action.payload.vat -
          item.quantity * item.vat;

        if (action.payload.quantity === 0) {
          state.items = state.items.filter(
            (i: any) => i.id !== action.payload.id
          );
        } else {
          item.quantity = action.payload.quantity;
        }
      } else if (action.payload.quantity > 0) {
        // Add a new item to the cart
        state.items.push({ ...action.payload });
        state.totalQuantity += action.payload.quantity;
        state.totalPrice += action.payload.quantity * action.payload.price;
        state.totalVAT += action.payload.quantity * action.payload.vat;
      }
    },

    removeFromCart: (state: any, action: any) => {
      const item = state.items.find((i: any) => i.id === action.payload.id);
      if (item) {
        // Subtract the item's quantity and price from totalQuantity and totalPrice
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.quantity * item.price;
      }
      state.items = state.items.filter(
        (item: any) => item.id !== action.payload.id
      );
    },

    updateQuantity: (state: any, action: any) => {
      const item = state.items.find((i: any) => i.id === action.payload.id);
      if (item) {
        // Update totalQuantity and totalPrice based on the change in quantity
        state.totalQuantity += action.payload.quantity - item.quantity;
        state.totalPrice +=
          action.payload.quantity * item.price - item.quantity * item.price;

        if (action.payload.quantity === 0) {
          state.items = state.items.filter(
            (i: any) => i.id !== action.payload.id
          );
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },

    clearCart: (state) => {
      // Reset totalQuantity and totalPrice to 0 when the cart is cleared
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.totalVAT = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
