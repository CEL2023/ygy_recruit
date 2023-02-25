import { create } from "zustand";
import { type IFetchMe } from "../api/auth/fetchMe";
import { type IUserStore } from "./storeType";

export const useUserStore = create<IUserStore>((set) => ({
  user: null as IFetchMe | null,
  setUser: (input: IFetchMe | null) => set({ user: input }),
}));
