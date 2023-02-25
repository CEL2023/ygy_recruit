import { useMutation, useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getClubStats,
  type IClubStats,
  mutateClubInfo,
} from "../../../../api/club";
import StatRow from "../../../../components/StatRow";
import {
  getClubForms,
  type IFormWithOutContent,
} from "../../../../api/form/api";
import { toDateString } from "../../../../lib/dateFormat";
function Page() {
  const {
    query: { clubId },
    push,
  } = useRouter();
  const { data, isLoading, error } = useQuery<
    any,
    AxiosError,
    { data: IClubStats }
  >({
    queryKey: [`club/admin/stats`, clubId],
    queryFn: () => getClubStats(clubId!),
  });
  const { data: form, isLoading: isLoadingForms } = useQuery<
    any,
    AxiosError,
    { data: IFormWithOutContent[] }
  >({
    queryKey: [`club/admin/forms`, clubId],
    queryFn: () => getClubForms(clubId!),
    enabled: !!data,
  });

  const { isLoading: isLoadingMutation, mutateAsync } = useMutation({
    mutationKey: ["club/admin/info", clubId],
    mutationFn: () => mutateClubInfo(clubId!, desc, image),
  });
  const [desc, setDesc] = useState<string>();
  const [image, setImage] = useState<string>("");
  const submitInfo = async () => {
    await mutateAsync();
  };
  useEffect(() => {
    setDesc(data?.data?.club?.desc);
  }, [data?.data]);
  return (
    <div className="mx-auto md:w-2/3">
      <h1 className="m-4 text-center text-4xl font-bold md:m-8 md:text-6xl">
        {"관리자 페이지"}
      </h1>
      {isLoading ? <div>loading....</div> : <StatRow data={data?.data!} />}
      <div className="my-2 mx-2 rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 md:mx-0 md:py-4 md:px-8">
        <div>
          <div className=" m-2 ml-0 text-xl font-semibold">동아리 배경사진</div>
          <div className="relative h-48">
            <Image
              fill
              className=" z-0 object-contain"
              src={
                data?.data?.club?.bgImg == "" ||
                data?.data?.club?.bgImg == undefined
                  ? "/ferris.jpg"
                  : data?.data?.club?.bgImg
              }
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="m-2 ml-0 text-xl font-semibold">동아리 설명</div>
          <textarea
            value={desc}
            rows={2}
            onChange={(e) => setDesc(e.target.value)}
            className=" w-full appearance-none border-b bg-transparent"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={submitInfo}
            disabled={isLoadingMutation}
            className="w-48 rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
          >
            {!isLoadingMutation ? "저장하기" : "loading..."}
          </button>
        </div>
      </div>
      <div
        onClick={() => push(`/club/${clubId}/admin/enroll`)}
        className="my-2 mx-2 rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 text-xl font-normal hover:text-indigo-500 md:mx-0 md:py-4 md:px-8"
      >
        제출된 지원서 보러가기 &gt;
      </div>
      <div className="my-2 mx-2 rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 text-xl font-normal  md:mx-0 md:py-4 md:px-8">
        <div>지원서 양식 보기</div>
        {!isLoadingForms
          ? form?.data?.map((item) => {
              return (
                <div
                  key={`${item.id}_form`}
                  onClick={() => push(`/club/${clubId}/admin/form/${item.id}`)}
                  className="flex justify-between p-2 hover:text-indigo-500"
                >
                  <div>{item.id}</div>
                  <div>{toDateString(item.createdAt)}</div>
                </div>
              );
            })
          : null}
      </div>
      <div
        onClick={() => push(`/club/${clubId}/admin/form/create`)}
        className="my-2 mx-2 rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 text-xl font-normal hover:text-indigo-500 md:mx-0 md:py-4 md:px-8"
      >
        지원서 양식 생성하기 &gt;
      </div>
    </div>
  );
}

export default Page;
