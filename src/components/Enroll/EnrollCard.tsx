import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { finalRegister, type IEnroll } from "../../api/enroll/api";
import { clubIdToStr } from "../../lib/clubIdToStr";
import { toDateString } from "../../lib/dateFormat";
import { toPassLevelStr } from "../../lib/passLevelToStr";
import { useGlobalModal } from "../../zustand/GlobalModalStore";
import BasicLoader from "../Global/Loaders/BasicLoader";

function EnrollCard({ enroll }: { enroll: IEnroll }) {
  const [clubname, setClubName] = useState("");
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const { setGMOpen } = useGlobalModal();
  const { push } = useRouter();
  const [canRegister, setCanRegister] = useState<boolean>(false);
  const { isLoading, mutateAsync } = useMutation<any, AxiosError>({
    useErrorBoundary: false,
    mutationFn: () => {},
    mutationKey: ["me/finalRegister", enroll.id],
    onSuccess: async () => {
      await push("/finalRegister");
    },
    onError: (error, variables, context) => {
      if (error.status == 403) {
        return setGMOpen(true, {
          title: "알림",
          content: "더 이상 신청할 수 없습니다",
        });
      } else if (error.status == 401) {
        return setGMOpen(true, {
          title: "알림",
          content: "다시 로그인해주세요",
        });
      }
      setGMOpen(true, {
        title: "알림",
        content: "더 이상 자리가 없습니다",
      });
    },
  });
  useEffect(() => {}, [enroll]);
  const time = useRef(
    Math.floor(
      (1678287600000 +
        518400000 - //12시
        3600000 * (enroll.passLevel == 7 ? 2 : 1) + //우발이면 - 2시간 아니면 1시간
        900000 * (enroll.passLevel == 7 ? 0 : enroll.priority! - 1) - //우발
        Date.now()) /
        1000
    )
  );
  const timerId = useRef<NodeJS.Timer>();

  const toName = async () => {
    const data = await clubIdToStr(enroll.clubId.toString());
    setClubName(data);
  };
  useEffect(() => {
    timerId.current = setInterval(() => {
      setHour(Math.floor(time.current / 3600));
      setMin(Math.floor((time.current % 3600) / 60));
      setSec(Math.floor(time.current % 60));
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);
  useEffect(() => {
    if (time.current <= 0) {
      setCanRegister(true);
      clearInterval(timerId.current);
    }
  }, [sec]);
  useEffect(() => {
    toName();
  }, [enroll]);
  return (
    <div className="">
      <div className="flex flex-col justify-between gap-2 rounded-xl py-3 px-8 shadow-lg sm:px-6">
        <div className="flex flex-col gap-2 py-8 px-2">
          <div className=" text-3xl font-semibold">{enroll.priority}지망</div>
          <div className="flex flex-row gap-2">
            <div>{clubname}</div>
            <div
              className={`${
                enroll.finalRegister == true
                  ? " text-emerald-500"
                  : enroll.passLevel == 0
                  ? "text-amber-800"
                  : enroll.passLevel == 1
                  ? "text-red-500"
                  : enroll.passLevel == 3
                  ? "text-rose-700"
                  : enroll.passLevel == 4
                  ? "text-cyan-700"
                  : enroll.passLevel == 5
                  ? "text-pink-800"
                  : enroll.passLevel == 6
                  ? "text-blue-800"
                  : enroll.passLevel == 7
                  ? "text-[#7ca6de]"
                  : "text-amber-800"
              } font-semibold`}
            >
              {enroll.finalRegister
                ? "최종 합격"
                : toPassLevelStr(enroll?.passLevel)?.status}
            </div>
          </div>
          <div>{toDateString(enroll?.updatedAt)}에 제출됨</div>
          <div className=" flex flex-col gap-1">
            <button
              onClick={() => push(`/me/enroll/${enroll?.id.toString()}`)}
              className=" mx-auto w-full rounded-xl bg-blue-900 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-blue-800"
            >
              지원서 보기
            </button>
            {enroll?.finalRegister ? null : (
              <button
                onClick={async () => await mutateAsync()}
                disabled={
                  !(
                    ((enroll?.passLevel! > 0 && enroll?.passLevel % 2 == 0) ||
                      enroll.passLevel == 7) &&
                    canRegister
                  )
                }
                className={`${
                  canRegister
                    ? "transition-all duration-200 hover:scale-105"
                    : "brightness-50"
                } ${
                  enroll.passLevel == 0
                    ? "bg-amber-800"
                    : enroll.passLevel == 1
                    ? "bg-red-500"
                    : enroll.passLevel == 3
                    ? "bg-rose-700"
                    : enroll.passLevel == 4
                    ? "bg-cyan-700"
                    : enroll.passLevel == 5
                    ? "bg-pink-800"
                    : enroll.passLevel == 6
                    ? "bg-blue-800"
                    : enroll.passLevel == 7
                    ? "bg-[#7ca6de]"
                    : "bg-amber-800"
                } mx-auto w-full rounded-xl px-4 py-2 text-xl font-medium text-white `}
              >
                {time.current <= 0 ? (
                  <>
                    {isLoading ? (
                      <div className="h-8 w-8">
                        <BasicLoader />
                      </div>
                    ) : (
                      <>
                        {enroll.passLevel == 6 || enroll.passLevel == 7
                          ? `${
                              enroll.passLevel == 7
                                ? "우선 선발"
                                : `${enroll.priority}지망 신청`
                            }`
                          : toPassLevelStr(enroll.passLevel).status}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-center font-bold">지원까지</div>
                    {hour}시간{min}분{sec}초
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollCard;
