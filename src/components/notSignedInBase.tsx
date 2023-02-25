import Link from "next/link";
import React from "react";

function NotSignedInBase() {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl">
      <div className="flex items-center justify-center gap-1">
        <Link
          href={"/signin"}
          className="focus:shadow-outline h-10 items-center justify-center break-words rounded py-2 px-4 text-base font-bold hover:bg-black hover:bg-opacity-10 hover:text-indigo-400 focus:outline-none dark:hover:bg-transparent"
        >
          <div className="text-center">로그인</div>
        </Link>
        <Link
          href={"/signup"}
          className="focus:shadow-outline h-10 break-words rounded bg-indigo-400 py-2 px-6 text-center text-base font-bold text-white hover:bg-indigo-700  focus:outline-none"
        >
          <div className="text-center">가입</div>
        </Link>
      </div>
    </div>
  );
}

export default NotSignedInBase;
