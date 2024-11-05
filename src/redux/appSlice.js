import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: null,
  isLoggedIn: false,
  name: '',
  token: null,
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
    setName(state, action) {
      state.name = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearCart(state) {
      state.cart = null;
    },
  },
});

export const { setCart, setIsLoggedIn, setName, setToken, clearCart } = appSlice.actions;
export default appSlice.reducer;
