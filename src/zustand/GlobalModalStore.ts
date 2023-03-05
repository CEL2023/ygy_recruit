import { create } from "zustand";
import { IMessageField, type IGlobalModal } from "./storeType";

export const useGlobalModal = create<IGlobalModal>((set) => ({
  isOpen: false,
  message: {
    title: "",
    closeText: "",
    content: "",
  },
  setGMOpen: (open: boolean, MessageField?: IMessageField) =>
    set({
      isOpen: open,
      message: MessageField?.closeText
        ? MessageField
        : ({ closeText: "닫기", ...MessageField } as IMessageField),
    }),
}));
