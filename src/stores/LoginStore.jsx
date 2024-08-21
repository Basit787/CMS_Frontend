import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const LoginStore = (set) => ({
  loginData: null,
  login: (data) => {
    set(() => ({
      loginData: { ...data },
    }));
  },
  logout: () => {
    set(() => ({
      loginData: "",
    }));
  },
});

const useLoginStore = create(
  devtools(persist(LoginStore, { name: "dialogBox" }))
);

export default useLoginStore;
