import React from "react";

function Footer() {
  return (
    <footer className="flex h-12 w-full flex-col items-center justify-center shadow-xl">
      <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © 2023{" "}
        <a href="/club/17" className="hover:underline">
          KyunggiHighSchoolCE-L™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}

export default Footer;
