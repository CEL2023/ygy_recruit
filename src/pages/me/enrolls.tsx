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
        <div className=" m-8 mx-auto flex flex-col gap-2 border-b">
          <div className=" text-bold m-4 mt-6 text-center text-4xl">
            나의 지원
          </div>
          {data?.data?.map((item, index) => {
            return <EnrollCard key={index} enroll={item} />;
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Enrolls;
