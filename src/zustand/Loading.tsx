import { create } from "zustand";
import { ILoading } from "./storeType";

export const useLoading = create<ILoading>((set) => ({
  isLoading: false,
  setGLLoading: (input: boolean) => set({ isLoading: input }),
}));
