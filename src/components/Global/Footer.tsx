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
      <div>문제 발생시 010-5395-2545로 연락바랍니다</div>
    </footer>
  );
}

export default Footer;
