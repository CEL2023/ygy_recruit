import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getMyEnrolls, IEnroll } from "../../api/enroll/api";
import EnrollCard from "../../components/Enroll/EnrollCard";
import { useUserStore } from "../../zustand/User";

function Enrolls() {
  const { user } = useUserStore();
  const { back, push } = useRouter();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IEnroll[] }>({
    queryKey: [`user/enroll`, user?.username],
    queryFn: getMyEnrolls,
  });
  useEffect(() => {
    if (user?.rank && user?.rank > 0) {
      push("/me");
    }
  }, []);
  return (
    <div>
      {!user?.rank ? (
        <div className=" m-16 flex flex-col items-center justify-start gap-2 border-b">
          <div className=" m-8 mt-6 text-center text-4xl font-bold">
            <div>나의 지원</div>
            <div>제출은 3개까지, 임시지원은 개수 제한 없습니다</div>
          </div>
          <div className=" flex gap-4">
            <div className=" text-3xl font-semibold">1지망</div>
            {data?.data
              ?.filter((item) => item.priority == 1)
              .map((item, index) => {
                return <EnrollCard key={index} enroll={item} />;
              })}
            <div className=" text-3xl font-semibold">2지망</div>
            {data?.data
              ?.filter((item) => item.priority == 2)
              .map((item, index) => {
                return <EnrollCard key={index} enroll={item} />;
              })}
            <div className=" text-3xl font-semibold">3지망</div>
            {data?.data
              ?.filter((item) => item.priority == 3)
              .map((item, index) => {
                return <EnrollCard key={index} enroll={item} />;
              })}
          </div>
          <div className=" text-3xl font-semibold">임시저장</div>
          {data?.data
            ?.filter((item) => !item.isEditCompleted)
            .map((item, index) => {
              return <EnrollCard key={index} enroll={item} />;
            })}
        </div>
      ) : null}
    </div>
  );
}

export default Enrolls;
