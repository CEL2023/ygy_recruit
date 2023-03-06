import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetcher } from "../api/fetcher";
import { validate } from "../lib/validate";
import { useGlobalModal } from "../zustand/GlobalModalStore";

function FindMyPwd() {
  const [newPWD, setNewPWD] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const { setGMOpen } = useGlobalModal();
  const {
    push,
    query: { token },
  } = useRouter();
  const { mutateAsync: mutateAsyncPWD } = useMutation({
    mutationKey: ["me/regpwdemail/update"],
    mutationFn: async () => {
      await fetcher.post("/api/v1/me/changePWWithoutPW", {
        password: newPWD,
        username,
        token,
      });
    },
    useErrorBoundary: false,
    onError(error, variables, context) {
      setGMOpen(true, { title: "오류", content: "비밀번호가 잘못되었습니다" });
      setNewPWD("");
    },
    onSuccess(data, variables, context) {
      setGMOpen(true, { title: "알림", content: "성공적으로 변경되었습니다" });
      push("/");
    },
  });
  const checkPWD = async () => {
    if (!validate.password(newPWD)) return;
    await mutateAsyncPWD();
  };
  useEffect(() => {
    if (!token) {
      push("/");
      return;
    }
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkPWD();
        }}
        className=" mx-10 flex flex-col gap-3"
      >
        <div className=" text-4xl font-semibold">새로운 비밀번호 입력하기</div>
        <label htmlFor="new">아이디</label>
        <input
          id="username"
          type="text"
          className="shadow-xs block h-10 w-full rounded-md border px-5  text-black dark:bg-white"
          placeholder="아이디"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        />
        <label htmlFor="new">새로운 비밀번호</label>
        <input
          id="new"
          type="password"
          className="shadow-xs block h-10 w-full rounded-md border px-5  text-black dark:bg-white"
          placeholder="새로운 비밀번호"
          onChange={(e) => setNewPWD(e.target.value)}
          value={newPWD}
        />
        <div className="items-center justify-center">
          <button
            className="mx-auto w-full rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
            type="submit"
          >
            비밀번호 변경하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default FindMyPwd;
