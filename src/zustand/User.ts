import { create } from "zustand";
import { IFetchMe } from "../api/auth/fetchMe";
import { IUserStore } from "./storeType";

export const useUserStore = create<IUserStore>((set) => ({
  user: null as IFetchMe | null,
  setUser: (input: IFetchMe | null) => set({ user: input }),
}));
