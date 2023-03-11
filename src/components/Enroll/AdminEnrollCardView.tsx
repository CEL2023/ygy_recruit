import { QueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { enrollStatusChange, type IEnroll } from "../../api/enroll/api";
import { toDateString } from "../../lib/dateFormat";
import { toPassLevelStr } from "../../lib/passLevelToStr";
function AdminEnrollCardView({
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
    <div className=" w-full rounded-xl py-3 px-4 shadow-lg duration-300 hover:-translate-y-1 ">
      <div className="flex flex-col justify-between">
        <Link
          href={`/club/${clubId.toString()}/admin/enroll/${enroll?.id?.toString()}`}
          className="flex-col justify-between gap-2  sm:flex sm:px-6"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
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
      </div>
    </div>
  );
}

export default AdminEnrollCardView;
