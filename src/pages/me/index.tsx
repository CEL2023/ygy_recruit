import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getMyEnrolls, type IEnroll } from "../../api/enroll/api";
import EnrollCard from "../../components/Enroll/EnrollCard";
import { useLogout } from "../../hooks/useLogout";
import { useUserStore } from "../../zustand/User";

function Page() {
  const { user } = useUserStore();
  return (
    <div className=" p-4">
      <div>
        <div className=" mx-auto">
          <h1 className="text-bold m-4 mt-6 text-center text-6xl font-bold">
            마이페이지
          </h1>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className=" border-b py-4 text-start">
            <div className=" mb-4 text-4xl font-bold">내 정보</div>
            <div>
              <div className=" text-xl font-semibold">이름</div>
              <div className=" text-2xl font-bold">{user?.name}</div>
            </div>
            <div>
              <div className=" text-xl font-semibold">아이디</div>
              <div className=" text-2xl font-bold">{user?.username}</div>
            </div>
            <div>
              <div className=" text-xl font-semibold">학번</div>
              <div className=" text-2xl font-bold">{user?.studentId}</div>
            </div>
            <div>
              <div className=" text-xl font-semibold">이메일</div>
              <div className=" text-2xl font-bold">{user?.email}</div>
            </div>
            <Link href={"/me/account-settings"}>
              <div className=" cursor-pointer rounded-lg p-2 pl-0 text-2xl font-bold  hover:text-indigo-400">
                내 정보 수정하기 &gt;
              </div>
            </Link>
            <Link href={"/me/enrolls"}>
              <div className=" cursor-pointer rounded-lg p-2 pl-0 text-2xl font-bold  hover:text-indigo-400">
                나의 지원 보러가기 &gt;
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
