import React, { useState } from "react";
import { fetcher } from "../api/fetcher";

function FindMyPWD() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const sendEmail = async ({
    username,
    email,
  }: {
    username: string;
    email: string;
  }) => {
    await fetcher
      .post("/api/v1/me/changePWReq", { username, email })
      .then(() => setSent(true));
  };
  return (
    <>
      {sent ? (
        <div className="mt-20 text-center text-4xl font-bold">
          {email}로 <br /> 이메일이 전송되었습니다 이메일을 확인해 주세요
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await sendEmail({ username, email });
          }}
        >
          <div className=" mt-10 text-4xl font-semibold">비밀번호 찾기</div>
          <label htmlFor="previous">이메일</label>
          <input
            id="email"
            type="email"
            className="shadow-xs mb-10 block h-10 w-full rounded-md border px-5 text-black dark:bg-white"
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="new">아이디</label>
          <input
            id="username"
            type="text"
            className="shadow-xs mb-10 block h-10 w-full rounded-md border px-5  text-black dark:bg-white"
            placeholder="아이디"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
          <button className="mx-auto w-full rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400">
            제출하기
          </button>
        </form>
      )}
    </>
  );
}

export default FindMyPWD;
