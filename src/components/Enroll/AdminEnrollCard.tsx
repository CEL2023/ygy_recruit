import { QueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { enrollStatusChange, type IEnroll } from "../../api/enroll/api";
import { toDateString } from "../../lib/dateFormat";
import { toPassLevelStr } from "../../lib/passLevelToStr";
import BasicLoader from "../Global/Loaders/BasicLoader";
const queryClient = new QueryClient();
function AdminEnrollCard({
  enroll,
  clubId,
}: {
  enroll: IEnroll;
  clubId: string | string[];
}) {
  const [selected, setSelected] = useState<number>(enroll.passLevel);
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: [`club/enroll/status`, clubId, enroll.id],
    mutationFn: () =>
      enrollStatusChange(clubId, enroll.id.toString(), selected),
  });
  return (
    <div className=" w-full rounded-xl py-3 px-4 shadow-lg duration-300 hover:-translate-y-1">
      <div className="flex justify-between">
        <Link
          href={`/club/${clubId.toString()}/admin/enroll/${enroll?.id?.toString()}`}
          className="flex-col justify-between gap-2  sm:flex sm:px-6"
        >
          <div className="flex gap-4">
            <div className="flex gap-2">
              <div className=" text-sm font-semibold">{enroll?.User?.name}</div>
              <div className=" text-sm font-semibold">
                {enroll?.User?.studentId}
              </div>
              <div className=" text-sm font-semibold">
                {enroll?.priority ? enroll.priority : null}지망
              </div>
              <div
                className={`${
                  enroll.passLevel == 0
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
                {toPassLevelStr(enroll?.passLevel).status}
              </div>
            </div>
          </div>
          <div>{toDateString(enroll?.updatedAt)}</div>
        </Link>
        <div className=" flex flex-col gap-2 ">
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
          <button
            onClick={async () => {
              await mutateAsync();
              await queryClient.invalidateQueries([`club/enroll/status`]);
            }}
            className="rounded-xl bg-[#7ca6de]  px-2 py-1 text-lg font-medium text-white transition-all duration-200 hover:bg-[#668fc5]"
          >
            {isLoading ? (
              <div className="flex h-8 w-8 items-center justify-center">
                <BasicLoader />
              </div>
            ) : (
              "설정하기"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminEnrollCard;
