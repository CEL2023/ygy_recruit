import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getAllSubmittedEnroll,
  getAllSavedEnroll,
  type IEnroll,
} from "../../../../../api/enroll/api";
import AdminEnrollCard from "../../../../../components/Enroll/AdminEnrollCard";
import BasicLoader from "../../../../../components/Global/Loaders/BasicLoader";
import { useHideStore } from "../../../../../zustand/HideStore";

function Page() {
  const {
    query: { clubId },
  } = useRouter();
  const { hide: hided, setHide } = useHideStore();
  const [hide, setHideT] = useState<boolean>(false);
  useEffect(() => {
    setHideT(hided);
  }, [hided]);
  const { data, isLoading } = useQuery<any, AxiosError, { data: IEnroll[] }>({
    queryKey: [`club/admin/enrolls`, clubId],
    queryFn: () => getAllSavedEnroll(clubId!),
  });
  const [filtered, setFiltered] = useState<IEnroll[]>();

  useEffect(() => {
    if (hide) {
      return setFiltered(
        data?.data.filter((i) => {
          return (i.passLevel > 0 && i.passLevel % 2 == 0) || i.passLevel == 7;
        })
      );
    }
    setFiltered(data?.data);
  }, [hide, data]);
  return (
    <div>
      {isLoading ? (
        <BasicLoader />
      ) : (
        <div className=" mx-auto flex w-5/6 flex-col gap-4">
          <div className=" text-bold m-4 mt-10 text-center text-6xl">지원</div>
          <div className=" mx-5 flex  items-center justify-end gap-2 text-2xl">
            <label htmlFor="hide">탈락자 숨기기</label>
            <input
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              id="hide"
              type={"checkbox"}
              checked={hide}
              onChange={(e) => {
                setHide(e.target.checked);
              }}
            />
          </div>
          <div className=" flex flex-col gap-4">
            <div className=" text-3xl font-semibold">1지망 신청</div>
            {filtered
              ?.filter((item) => item.priority == 1)
              ?.map((item, index) => {
                return (
                  <AdminEnrollCard key={index} enroll={item} clubId={clubId!} />
                );
              })}
          </div>
          <div>
            <div className=" text-3xl font-semibold">2지망 신청</div>
            {filtered
              ?.filter((item) => item.priority == 2)
              ?.map((item, index) => {
                return (
                  <AdminEnrollCard key={index} enroll={item} clubId={clubId!} />
                );
              })}
          </div>
          <div>
            <div className=" text-3xl font-semibold">3지망 신청</div>
            {filtered
              ?.filter((item) => item.priority == 3)
              ?.map((item, index) => {
                return (
                  <AdminEnrollCard key={index} enroll={item} clubId={clubId!} />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
