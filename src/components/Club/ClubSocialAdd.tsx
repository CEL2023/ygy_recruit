import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDoubleDownIcon } from "@heroicons/react/solid";
import { useMutation } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { fetcher } from "../../api/fetcher";
import { validate } from "../../lib/validate";
import { useGlobalModal } from "../../zustand/GlobalModalStore";
const socials = [
  {
    name: "instagram",
    src: "/ferris.jpg",
  },
  {
    name: "facebook",
    src: "/ferris.jpg",
  },
  {
    name: "YouTube",
    src: "/ferris.jpg",
  },
];
interface props {
  clubId: string;
}
function ClubSocialAdd({ clubId }: props) {
  const [selected, setSelected] = useState(socials[0]?.name);
  const [link, setLink] = useState("");
  const { setGMOpen } = useGlobalModal();
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await fetcher.post(`/api/v1/club/${clubId}/addSocial`, {
        type: selected,
        link,
      });
    },
    mutationKey: ["club/admin/social", clubId, selected],
  });
  const beforeSubmit = async () => {
    if (!validate.link(link)) {
      setGMOpen(true, { title: "알림", content: "유효하지 않은 링크입니다" });
      return;
    }
    await mutateAsync();
    setGMOpen(true, { title: "알림", content: "성공적으로 추가 되었습니다" });
  };
  return (
    <div>
      <div>소셜 링크 입력</div>
      <div className="  mx-2 flex items-center justify-between gap-2 ">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mb-10 mt-10">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDoubleDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {socials?.map((item, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={item.name}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <div className=" flex items-center justify-center gap-2">
          <input
            id="new"
            type="text"
            className="shadow-xs block h-10 w-full rounded-md border px-5  text-black dark:bg-white"
            placeholder="링크"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
        </div>
      </div>
      <div className="items-center justify-center">
        <button
          onClick={beforeSubmit}
          className="mx-auto w-full rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

export default ClubSocialAdd;
