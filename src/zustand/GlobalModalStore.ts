import { create } from "zustand";
import { type IGlobalModal } from "./storeType";

export const useGlobalModal = create<IGlobalModal>((set) => ({
  isOpen: false,
  setGMOpen: (input: boolean) => set({ isOpen: input }),
}));
