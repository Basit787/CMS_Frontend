import { createSlice } from "@reduxjs/toolkit";

export const DialogBoxSlice = createSlice({
  name: "dialogBox",
  initialState: {
    open: false,
    title: "",
    message: "",
    response: (actionType) => {},
  },
  reducers: {
    setDialogOpen: (state, action) => {
      const keys = Object.keys(action.payload);
      keys.forEach((key) => {
        state[key] = action.payload[key];
      });
      state.open = true;
    },
    setDialogClose: (state) => {
      const keys = Object.keys(state);
      keys.forEach((key) => {
        state[key] = "";
      });
    },
  },
});

export const ActionType = {
  positive: "positive",
  negative: "negative",
};

export const { setDialogOpen, setDialogClose } = DialogBoxSlice.actions;

export default DialogBoxSlice.reducer;
