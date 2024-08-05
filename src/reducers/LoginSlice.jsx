import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    entry: (state, action) => {
      const keys = Object.keys(action.payload);
      keys.forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    logout: (state) => {
      const keys = Object.keys(state);
      keys.forEach((key) => {
        state[key] = "";
      });
    },
  },
});

export const { entry, logout } = LoginSlice.actions;

export default LoginSlice.reducer;
