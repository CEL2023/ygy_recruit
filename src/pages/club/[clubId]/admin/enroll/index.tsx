import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import {
  getAllSubmittedEnroll,
  type IEnroll,
} from "../../../../../api/enroll/api";
import AdminEnrollCard from "../../../../../components/Enroll/AdminEnrollCard";

function Page() {
  const {
    query: { clubId },
  } = useRouter();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IEnroll[] }>({
    queryKey: [`club/admin/enrolls`, clubId],
    queryFn: () => getAllSubmittedEnroll(clubId!),
  });
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className=" flex flex-col gap-4">
          <div className=" text-bold m-4 mt-10 text-center text-6xl">지원</div>
          {data?.data
            ?.sort((a, b) => {
              if (a?.priority! < b?.priority!) {
                return 1;
              }
              if (a?.priority! > b?.priority!) {
                return -1;
              }
              if (a?.priority! == b?.priority!) {
                if (a?.id < b?.id) {
                  return 1;
                }
                if (a?.id > b?.id) {
                  return -1;
                }
              }
              return 0;
            })
            .map((item, index) => {
              return (
                <AdminEnrollCard key={index} enroll={item} clubId={clubId!} />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Page;
