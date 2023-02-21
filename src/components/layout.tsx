import React from "react";
import GlobalLoader from "./GlobalLoader";
import NavBar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white  text-black antialiased transition-colors duration-1000 dark:bg-[#212121] dark:text-white">
      <GlobalLoader />
      <NavBar />
      <div className="relative mx-auto  sm:max-w-2xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
        {children}
      </div>
    </div>
  );
}
