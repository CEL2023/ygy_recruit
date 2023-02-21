import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { getMyEnroll, IEnroll } from "../../api/enroll";
import EnrollCard from "../../components/EnrollCard";
import { useLogout } from "../../hooks/useLogout";
import { useUserStore } from "../../zustand/User";

function index() {
  const logout = useLogout();
  const { user } = useUserStore();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IEnroll[] }>({
    queryKey: [`/api/${user?.username}/enroll`],
    queryFn: getMyEnroll,
  });
  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className=" mx-auto">
            <div className="mx-auto w-1/2">
              <div className=" text-bold m-4 mt-10 text-center text-4xl">
                나의 지원
              </div>
              {data?.data.map((item, index) => {
                return (
                  <EnrollCard
                    key={index}
                    enroll={item}
                    clubId={item.clubId.toString()}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      <button
        className="mx-auto w-48 rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
        onClick={logout}
      >
        로그아웃
      </button>
    </div>
  );
}

export default index;
