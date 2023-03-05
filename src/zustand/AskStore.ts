import { create } from "zustand";
import { IMessageField, ISelection, type IAsk } from "./storeType";

export const useAsk = create<IAsk>((set) => ({
  isOpen: false,
  message: {
    title: "",
    closeText: "",
    content: "",
  },
  selection: {
    yes: "",
    no: "",
    selected: "none",
  },
  setAskOpen: (
    open: boolean,
    selection?: ISelection,
    MessageField?: IMessageField
  ) =>
    set({
      isOpen: open,
      selection: selection,
      message: MessageField?.closeText
        ? MessageField
        : ({ closeText: "닫기", ...MessageField } as IMessageField),
    }),
}));
