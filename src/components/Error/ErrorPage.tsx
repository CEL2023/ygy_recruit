import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ErrorPage({ message, name }: { message: string; name: string }) {
  const { push, reload } = useRouter();
  const [waiting, setWaiting] = useState(true);
  const [pageMSG, setPageMsg] = useState("");
  useEffect(() => {
    if (parseInt(message.replace("Request failed with status code", "")) == 403)
      return setPageMsg("권한이 없습니다");
    if (parseInt(message.replace("Request failed with status code", "")) == 404)
      return setPageMsg("404 NOT FOUND");
    if (parseInt(message.replace("Request failed with status code", "")) == 401)
      return setPageMsg("다시 로그인 해주세요");
    if (parseInt(message.replace("Request failed with status code", "")) == 400)
      return setPageMsg("잘못된 요청입니다");
    if (parseInt(message.replace("Request failed with status code", "")) == 500)
      return setPageMsg("서버오류 관리자에게 문의해 주세요");
  }, [message]);
  return (
    <div className=" flex h-screen w-full items-center justify-center">
      <div>
        <div className=" flex gap-2">
          <button
            onClick={() => push(`/`)}
            className="mx-auto w-48 rounded-xl bg-emerald-500 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-green-400"
          >
            메인으로
          </button>
          <button
            onClick={() => push(`/me`)}
            className="mx-auto w-48 rounded-xl bg-cyan-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-green-400"
          >
            마이페이지
          </button>
        </div>

        <div className=" -mt-36 text-center text-4xl font-extrabold">
          {pageMSG}
          <div className="text-lg font-thin">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
