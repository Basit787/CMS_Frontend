import { create } from "zustand";
import { devtools } from "zustand/middleware";

const DialogBoxStore = (set) => ({
  dialogData: {
    title: "",
    message: "",
    response: (actionType) => {},
  },
  openDialog: (data) => {
    set(() => ({
      dialogData: { ...data, open: true },
    }));
  },
  closeDialog: () => {
    set(() => ({
      dialogData: "",
    }));
  },
});

export const ActionType = {
  positive: "positive",
  negative: "negative",
};

const useDialogBoxStore = create(
  devtools(DialogBoxStore, { name: "dialogBox" })
);

export default useDialogBoxStore;
