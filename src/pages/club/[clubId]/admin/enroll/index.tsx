import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { getAllSubmittedEnroll, IEnroll } from "../../../../../api/enroll";
import EnrollCard from "../../../../../components/EnrollCard";
import { toDateString } from "../../../../../lib/dateFormat";

function index() {
  const {
    query: { clubId },
  } = useRouter();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IEnroll[] }>({
    queryKey: [`/club/${clubId}/admin/enrolls`],
    queryFn: () => getAllSubmittedEnroll(clubId!),
  });
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className=" flex flex-col gap-4">
          <div className=" text-bold m-4 mt-10 text-center text-6xl">지원</div>
          {data?.data.map((item, index) => {
            return <EnrollCard key={index} enroll={item} clubId={clubId!} />;
          })}
        </div>
      )}
    </div>
  );
}

export default index;
