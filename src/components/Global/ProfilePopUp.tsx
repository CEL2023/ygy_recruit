import { Popover, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Fragment } from "react";
import { useLogout } from "../../hooks/useLogout";
const solutions = [
  {
    name: "마이페이지",
    href: "/me",
  },
  {
    name: "나의 지원",
    href: "/me/enrolls",
  },
];
function ProfilePopUp({ name }: { name: string }) {
  const logout = useLogout();
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                focus:shadow-outline group inline-flex h-10 items-center justify-center break-words rounded-lg py-1 px-2 text-base font-bold hover:bg-indigo-400 hover:bg-opacity-20 focus:outline-none`}
          >
            <UserIcon className=" h-4 w-4 stroke-2 text-center text-black dark:text-white" />
            <div>{name}</div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 right-0 z-[999998] mt-2 w-screen max-w-xs -translate-x-1/2 transform rounded-lg bg-white px-4 dark:bg-[#212121] sm:px-0 ">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6  p-6 ">
                  {solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-indigo-400 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{item.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className=" p-4 pt-0">
                  <div
                    onClick={() => logout()}
                    className="flow-root cursor-pointer rounded-md px-4 py-2 transition duration-150 ease-in-out hover:bg-indigo-400 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <span className="flex items-center">
                      <span className="text-sm font-medium ">로그아웃</span>
                    </span>
                    <span className="block text-sm ">
                      계정에서 로그아웃 합니다
                    </span>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default ProfilePopUp;
