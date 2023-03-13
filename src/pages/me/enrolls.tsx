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
        <div className=" m-16 mx-auto flex flex-col items-center justify-start gap-2 ">
          <div className=" m-8 mt-6 text-center text-4xl font-bold">
            <div>나의 지원</div>
          </div>
          <div className="w-full">
            <div className=" grid w-full gap-4 rounded-2xl p-8 shadow-2xl  md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((_, idx) => {
                return (
                  <div>
                    {data?.data
                      .filter((p) => p.priority! == idx + 1)
                      .map((item, index) => {
                        return <EnrollCard key={index} enroll={item} />;
                      })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Enrolls;
