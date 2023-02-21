import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import UserProfileCard from "./UserProfileCard";
import { useUserStore } from "../zustand/User";
import Logo from "./Logo";
const DynamicThemeSelect = dynamic(() => import("../components/ThemeSelect"), {
  ssr: false,
});
const DynamicLogo = dynamic(() => import("../components/Logo"), {
  ssr: false,
});
export default function NavBar() {
  const { user } = useUserStore();
  return (
    <header className="sticky top-0 z-[99] w-full bg-white shadow transition-colors duration-1000 dark:bg-[#212121] ">
      <nav>
        <div className="mx-auto sm:max-w-2xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
          <div className="flex-column relative flex items-center justify-between gap-10 py-3 px-6 text-xl ">
            <DynamicLogo />
            <div className="flex gap-8">
              <div className="flex items-center justify-center gap-8 ">
                <Link href={"/club"}>
                  <div className="text-center text-base font-bold">
                    지원하기
                  </div>
                </Link>
              </div>
              <div className="flex gap-4">
                <UserProfileCard user={user} />
                <DynamicThemeSelect />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
