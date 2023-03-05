import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { changePassword, changeSId } from "../../api/me/api";
import { validate } from "../../lib/validate";
import { useGlobalModal } from "../../zustand/GlobalModalStore";
import { useUserStore } from "../../zustand/User";

function AccountSettings() {
  const { user } = useUserStore();
  const { setGMOpen } = useGlobalModal();
  const [prevPWD, setPrevPwd] = useState<string>("");
  const [newPWD, setNewPWD] = useState<string>("");
  const [SId, setSId] = useState<number>(user?.studentId!);
  const { mutateAsync: mutateAsyncPWD } = useMutation({
    mutationKey: ["me/pwd/update"],
    mutationFn: () => changePassword({ prevPWD, newPWD }),
    useErrorBoundary: false,
    onError(error, variables, context) {
      setGMOpen(true, { title: "오류", content: "비밀번호가 잘못되었습니다" });
      setNewPWD("");
    },
    onSuccess(data, variables, context) {
      setGMOpen(true, { title: "알림", content: "성공적으로 변경 되었습니다" });
      setNewPWD("");
      setPrevPwd("");
    },
  });
  const { mutateAsync: mutateAsyncSId } = useMutation({
    mutationKey: ["me/SId/update"],
    mutationFn: () => changeSId({ studentId: SId }),
    useErrorBoundary: false,
    onSuccess(data, variables, context) {
      setGMOpen(true, { title: "알림", content: "성공적으로 변경 되었습니다" });
      setSId(user?.studentId!);
    },
    onError(error, variables, context) {
      setGMOpen(true, { title: "오류", content: "뭔가 오류 있음" });
      setNewPWD("");
    },
  });
  const checkPWD = async () => {
    if (!validate.password(newPWD)) return;
    await mutateAsyncPWD();
  };
  const checkSId = async () => {
    if (!(SId.toString().length === 5)) return;
    await mutateAsyncSId();
  };
  return (
    <div className=" mx-4 mt-10 flex max-w-md flex-col gap-4 md:mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkPWD();
        }}
        className=" flex flex-col gap-3"
      >
        <div className=" text-4xl font-semibold">비밀번호 변경하기</div>
        <label htmlFor="previous">이전 비밀번호</label>
        <input
          id="previous"
          type="password"
          className="shadow-xs block h-10 w-full rounded-md border px-5  text-black dark:bg-white"
          placeholder="이전 비밀번호"
          onChange={(e) => setPrevPwd(e.target.value)}
          value={prevPWD}
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkSId();
        }}
        className=" flex flex-col gap-3"
      >
        <div className=" text-4xl font-semibold">학번 변경하기</div>
        <label htmlFor="new">새로운 학번</label>
        <input
          id="new"
          type="studentId"
          className="shadow-xs block h-10 w-full rounded-md border px-5  text-black dark:bg-white"
          placeholder="새로운 학번"
          onChange={(e) => setSId(Number(e.target.value))}
          value={SId}
        />
        <div className="items-center justify-center">
          <button
            type="submit"
            className="mx-auto w-full rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
          >
            학번 변경하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountSettings;
