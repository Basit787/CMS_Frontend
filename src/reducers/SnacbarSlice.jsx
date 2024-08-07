import { createSlice } from "@reduxjs/toolkit";

export const SnackBarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    type: "",
    message: "",
  },
  reducers: {
    setSnackBarOpen: (state, action) => {
      const keys = Object.keys(action.payload);
      keys.forEach((key) => {
        state[key] = action.payload[key];
      });
      state.open = true;
    },

    setSnackBarClose: (state) => {
      const keys = Object.keys(state);
      keys.forEach((key) => {
        state[key] = "";
      });
    },
  },
});

export const SnackbarType = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
};

export const { setSnackBarOpen, setSnackBarClose } = SnackBarSlice.actions;

export default SnackBarSlice.reducer;
