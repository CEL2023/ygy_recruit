import { type IFetchMe } from "../api/auth/fetchMe";

export interface IUserStore {
  user: null | IFetchMe;
  setUser: (input: IFetchMe | null) => void;
}

export interface ILoading {
  isLoading: boolean;
  setGLLoading: (input: boolean) => void;
}
export interface IMessageField {
  title: string;
  content: string;
  closeText?: string;
}
export interface IGlobalModal {
  isOpen: boolean;
  message?: IMessageField;
  setGMOpen: (open: boolean, MessageField?: IMessageField) => void;
}
export interface IPriorityTab {
  isOpen: boolean;
  priorities?: number[];
  selectedPriority?: number;
  setPTOpen: (
    open: boolean,
    ele?: { priorityLists?: number[]; priority?: number | null }
  ) => void;
}
export interface ISelection {
  yes?: string;
  no?: string;
  selected: "yes" | "no" | "none";
}
export interface IAsk {
  isOpen: boolean;
  message?: IMessageField;
  selection?: ISelection;
  setAskOpen: (
    open: boolean,
    selection?: ISelection,
    MessageField?: IMessageField
  ) => void;
}
