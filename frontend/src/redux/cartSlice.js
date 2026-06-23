import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const saveToLocalStorage = (cartItems) => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productId === item.productId
            ? {
                ...x,
                qty: item.qty,
              }
            : x
        );
      } else {
        state.cartItems.push(item);
      }

      saveToLocalStorage(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          item.productId !== action.payload
      );

      saveToLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];

      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

/* Selectors */

export const selectCartItems = (state) =>
  state.cart.cartItems;

export const selectCartCount = (state) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce(
    (total, item) =>
      total + item.price * item.qty,
    0
  );

export default cartSlice.reducer;