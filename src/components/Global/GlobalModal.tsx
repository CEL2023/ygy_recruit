import React, { Fragment } from "react";
import { useGlobalModal } from "../../zustand/GlobalModalStore";
import { Dialog, Transition } from "@headlessui/react";
function GlobalModal() {
  const { isOpen, message, setGMOpen } = useGlobalModal();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[99999]"
        onClose={() => {
          setGMOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-[#212121]">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 "
                >
                  {message?.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm ">{message?.content}</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-[#7ca6de] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a89c8] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      setGMOpen(false);
                    }}
                  >
                    {message?.closeText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default GlobalModal;
