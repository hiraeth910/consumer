import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: null,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  name: localStorage.getItem("name") || '',
  token: localStorage.getItem("token") || null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    seTName(state, action) {
      state.name = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearCart(state) {
      state.cart = null;
    },
    initializeAuth(state) {
      state.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      state.name = localStorage.getItem("name") || '';
      state.token = localStorage.getItem("token") || null;
    },
  },
});

export const { setCart, setIsLoggedIn, setName, setToken, clearCart, initializeAuth } = appSlice.actions;
export default appSlice.reducer;
