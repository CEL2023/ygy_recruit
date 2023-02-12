import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { useEffect, useLayoutEffect, useState } from "react";
import ThemeSelect from "./ThemeSelect";

export default function NavBar() {
  return (
    <header className="z-99 sticky top-0 w-full bg-white shadow dark:bg-[#212121] ">
      <nav>
        <div className="mx-auto sm:max-w-2xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
          <div className="flex-column relative flex items-center justify-between gap-10 py-3 px-6 text-xl ">
            <Link href={"/"}>
              <Image src="/ferris.jpg" alt="" width={30} height={30} />
            </Link>
            <div className="flex gap-8">
              <div className="flex items-center justify-center gap-10 font-medium "></div>
              <ThemeSelect />
              <div>
                <div className="flex items-center justify-center gap-2 rounded-xl">
                  <div className="flex items-center justify-center">
                    <Link href={"/me"} className="relative h-8 w-8">
                      <Image
                        width={30}
                        height={30}
                        className="rounded-full"
                        src={`/ferris.jpg`}
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
