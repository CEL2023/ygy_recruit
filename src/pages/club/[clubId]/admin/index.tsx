import { useMutation, useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getClubStats,
  type IClubStats,
  mutateClubInfo,
  sendClubMessage,
} from "../../../../api/club";
import StatRow from "../../../../components/Stat/StatRow";
import {
  getClubForms,
  type IFormWithOutContent,
} from "../../../../api/form/api";
import { toDateString } from "../../../../lib/dateFormat";
import ClubSocialAdd from "../../../../components/Club/ClubSocialAdd";
import { HomeIcon } from "@heroicons/react/solid";
import Link from "next/link";
import BasicLoader from "../../../../components/Global/Loaders/BasicLoader";
import { toPassLevelStr } from "../../../../lib/passLevelToStr";
import ReactTextareaAutosize from "react-textarea-autosize";
import { getByte } from "../../../../lib/countByte";
function Page() {
  const [selected, setSelected] = useState<number>(0);
  const [bytes, setBytes] = useState<number>(0);
  const [inputD, setinputD] = useState<string>("");
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
    mutationFn: () => mutateClubInfo(clubId!, desc),
  });
  const { isLoading: isLoadingMessage, mutateAsync: messageMutate } =
    useMutation({
      mutationFn: () => sendClubMessage(clubId!, inputD, selected),
      mutationKey: ["admin/message", clubId, `${bytes}${clubId}${selected}`],
    });
  const [desc, setDesc] = useState<string>();
  const submitInfo = async () => {
    await mutateAsync();
  };
  useEffect(() => {
    setDesc(data?.data?.club?.desc);
  }, [data?.data]);
  return (
    <div className="mx-auto md:w-2/3">
      <h1 className="m-4 text-center text-4xl font-bold md:m-8 md:mb-4 md:text-6xl">
        {"관리자 페이지"}
      </h1>
      <Link
        href={`/club/${clubId}`}
        className="m-4 flex items-center justify-center gap-2 text-center text-2xl font-bold hover:text-[#668fc5]"
      >
        <HomeIcon className=" h-8 w-8" />
        동아리 홈으로
      </Link>
      {isLoading ? <BasicLoader /> : <StatRow data={data?.data!} />}
      <div className="my-2 mx-2 rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 md:mx-0 md:py-4 md:px-8">
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
        onClick={() => {}}
        className="rounded-x my-2 mx-2 rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 text-xl font-semibold md:mx-0 md:py-4 md:px-8"
      >
        <ClubSocialAdd clubId={clubId! as string} />
      </div>
      <div
        onClick={() => push(`/club/${clubId}/admin/enroll/edit`)}
        className="rounded-x my-2 mx-2 cursor-pointer rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 text-xl font-semibold hover:text-indigo-500 md:mx-0 md:py-4 md:px-8"
      >
        제출된 지원서 관리하기 &gt;
      </div>
      <div
        onClick={() => push(`/club/${clubId}/admin/enroll/show`)}
        className="rounded-x my-2 mx-2 cursor-pointer rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 text-xl font-semibold hover:text-indigo-500 md:mx-0 md:py-4 md:px-8"
      >
        지원서 모아보기 (면접용) &gt;
      </div>
      <div className="my-2 mx-2 rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 text-xl font-semibold  md:mx-0 md:py-4 md:px-8">
        <div>지원서 양식 보기</div>
        <div className="font-normal">
          가장 위에 있는 지원서가 실제 지원서로 사용됩니다
        </div>
        <div className="font-normal">
          꼭 지원서 배포 전까지 사용할 지원서 외의 지원서는 삭제 부탁드립니다
        </div>
        {!isLoadingForms
          ? form?.data?.map((item) => {
              return (
                <div
                  key={`${item.id}_form`}
                  onClick={() => push(`/club/${clubId}/admin/form/${item.id}`)}
                  className="flex cursor-pointer justify-between p-2 hover:text-indigo-500"
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
        className="my-2 mx-2 cursor-pointer rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 text-xl font-normal  md:mx-0 md:py-4 md:px-8"
      >
        지원서 양식 생성하기 &gt;
      </div>
      <div className="my-2 mx-2 cursor-pointer items-center rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 text-xl font-normal  md:mx-0 md:py-4 md:px-8">
        <div>문자발송</div>
        <div className=" flex items-center justify-between">
          <ReactTextareaAutosize
            className="block h-10  rounded-md border px-5 py-2 text-black shadow-sm dark:bg-white"
            value={inputD}
            onChange={(e) => {
              setinputD(e.target.value);
              setBytes(inputD.length == 0 ? 0 : getByte(inputD));
            }}
            onBlur={() => setBytes(inputD.length == 0 ? 0 : getByte(inputD))}
          />
          <div className=" flex gap-2">
            <div>발송대상:</div>
            <select
              value={selected}
              onChange={(e) => {
                setSelected(Number(e.target.value));
              }}
            >
              {Array.from(Array(8), (_, index) => {
                return (
                  <option key={index} value={index}>
                    {toPassLevelStr(index).status}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <div className={bytes > 120 ? "text-red-500" : ""}>
            {bytes}/120바이트
          </div>
          <div className="flex justify-end">
            <button
              onClick={async () => await messageMutate()}
              disabled={isLoadingMessage}
              className="w-48 rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
            >
              {!isLoadingMessage ? "발송하기" : "loading..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
