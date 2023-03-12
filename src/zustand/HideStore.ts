import { create } from "zustand";
import { persist } from "zustand/middleware";
import { hidePersist, hideState } from "./storeType";

export const useHideStore = create<hideState>()(
  persist(
    (set) => ({
      hide: false,
      setHide: (data: boolean) => {
        set((state) => ({ ...state, hide: data }));
      },
    }),
    {
      name: "hide",
    }
  )
);
