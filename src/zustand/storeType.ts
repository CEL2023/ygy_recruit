import { IFetchMe } from "../api/auth/fetchMe";

export interface IUserStore {
  user: null | IFetchMe;
  setUser: (input: IFetchMe | null) => void;
}

export interface ILoading {
  isLoading: boolean;
  setGLLoading: (input: boolean) => void;
}
