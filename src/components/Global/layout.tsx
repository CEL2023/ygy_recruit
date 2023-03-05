import React from "react";
import Footer from "./Footer";
import NavBar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="  bg-white  text-black antialiased transition-colors duration-1000 dark:bg-[#212121] dark:text-white">
      <NavBar />
      <div className="mx-auto min-h-screen sm:max-w-2xl md:max-w-5xl lg:max-w-6xl xl:max-w-6xl">
        {children}
      </div>
      <Footer />
    </div>
  );
}
