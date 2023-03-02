import React from "react";
import { useGlobalModal } from "../zustand/GlobalModalStore";

function GlobalModal() {
  const { isOpen, setGMOpen } = useGlobalModal();
  return (
    <dialog className=" border-none shadow-2xl backdrop-blur-2xl" open={isOpen}>
      GlobalModal
    </dialog>
  );
}

export default GlobalModal;
