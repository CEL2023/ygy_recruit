import { useRouter } from "next/router";
import React from "react";
import Lottie from "react-lottie-player";
import FinalRegisterLottie from "../../public/finalRegister.json";
function FinalRegister() {
  const { push } = useRouter();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className=" flex w-1/4 flex-col items-center justify-center">
        <Lottie animationData={FinalRegisterLottie} play />
        <div className=" text-2xl font-normal">등록이 완료되었습니다</div>
        <div className=" my-4 flex w-full gap-2">
          <button
            onClick={async () => await push("/me/enrolls")}
            className={`mx-auto w-full rounded-xl bg-[#7ca6de] px-4 py-2 text-xl font-medium text-white `}
          >
            나의 지원
          </button>
          <button
            onClick={async () => await push("/")}
            className={`mx-auto w-full rounded-xl bg-indigo-500 px-4 py-2 text-xl font-medium text-white `}
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinalRegister;
