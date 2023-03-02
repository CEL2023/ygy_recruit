import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import Image from "next/image";
import React from "react";
import { getMyEnrolls, type IEnroll } from "../../api/enroll/api";
import EnrollCard from "../../components/EnrollCard";
import { useLogout } from "../../hooks/useLogout";
import { useUserStore } from "../../zustand/User";

function Page() {
  const logout = useLogout();
  const { user } = useUserStore();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IEnroll[] }>({
    queryKey: [`user/enroll`, user?.username],
    queryFn: getMyEnrolls,
  });
  return (
    <div className=" p-4">
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className=" mx-auto">
            <h1 className="text-bold m-4 mt-6 text-center text-6xl font-bold">
              마이페이지
            </h1>
          </div>
        )}
      </div>
      <div className=" flex flex-col items-center justify-center gap-8">
        <div className="flex items-center justify-center gap-4">
          <div className="relative h-36 w-36">
            <Image
              fill
              className=" z-0 object-contain"
              src={
                user?.profImg == "" || user?.profImg == undefined
                  ? "/ferris.jpg"
                  : user?.profImg
              }
              alt=""
            />
          </div>
          <div className=" text-start text-2xl">
            <div>
              <div>아이디</div>
              <div>{user?.username}</div>
            </div>
            <div>
              <div>학번</div>
              <div>{user?.studentId}</div>
            </div>
            <div>
              <div>이메일</div>
              <div>{user?.email}</div>
            </div>
          </div>
        </div>
      </div>
      {!!!user?.rank ? (
        <div className=" m-8 mx-auto flex flex-col gap-2">
          <div className=" text-bold m-4 mt-6 text-center text-4xl">
            나의 지원
          </div>
          {data?.data?.map((item, index) => {
            return <EnrollCard key={index} enroll={item} />;
          })}
        </div>
      ) : null}
      <div>
        <button
          className="mx-auto w-48 rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
          onClick={logout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Page;
