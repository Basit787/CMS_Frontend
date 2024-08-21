import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const HeadingStore = (set) => ({
  heading: "Description",
  headingName: (data) => {
    set(() => ({
      heading: data,
    }));
  },
});

const useHeadingStore = create(
  devtools(persist(HeadingStore, { name: "heading" }))
);

export default useHeadingStore;
