import React from "react";
import NavBar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-black dark:text-white">
      <NavBar />
      <div className="relative mx-auto  sm:max-w-2xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
        {children}
      </div>
    </div>
  );
}
