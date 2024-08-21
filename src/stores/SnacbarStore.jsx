import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const SnackBarStore = (set) => ({
  snacbarData: {
    open: false,
    type: "",
    message: "",
  },

  openSnackbar: (data) => {
    set(() => ({
      snacbarData: { ...data, open: true },
    }));
  },

  closeSnackbar: () => {
    set(() => ({
      snacbarData: "",
    }));
  },
});

export const SnackbarType = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
};

const useSnackBarStore = create(devtools(SnackBarStore, { name: "snackbar" }));

export default useSnackBarStore;
