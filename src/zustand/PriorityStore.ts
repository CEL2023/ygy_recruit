import { create } from "zustand";
import { IMessageField, IPriorityTab, type IGlobalModal } from "./storeType";

export const usePriorityTab = create<IPriorityTab>((set) => ({
  isOpen: false,
  selectedPriority: 1,
  priorities: [1, 2, 3],
  setPTOpen: (
    open: boolean,
    ele?: { priorityLists?: number[]; priority?: number | null }
  ) =>
    set({
      isOpen: open,
      priorities: ele?.priorityLists ?? undefined,
      selectedPriority: ele?.priority ?? undefined,
    }),
}));
