import Link from "next/link";
import React from "react";
import { type IEnroll } from "../api/enroll/api";
import { toDateString } from "../lib/dateFormat";
import { toPassLevelStr } from "../lib/passLevelToStr";

function EnrollCard({
  enroll,
  clubId,
}: {
  enroll: IEnroll;
  clubId: string | string[];
}) {
  return (
    <Link
      className="hover:text-indigo-400"
      href={`/club/${clubId.toString()}/admin/enroll/${enroll?.id.toString()}`}
    >
      <div className="flex-col justify-between gap-2 rounded-xl py-3 px-4 shadow-lg sm:flex sm:px-6">
        <div className="flex gap-4">
          <div className="flex gap-2">
            <div>{enroll?.User?.name}</div>
            <div className=" hidden sm:block">{enroll?.User?.username}</div>
            <div>{enroll?.User?.studentId}</div>
            <div
              className={`${
                enroll?.passLevel == 1
                  ? "text-red-600"
                  : enroll?.passLevel == 2
                  ? "text-green-500"
                  : enroll?.passLevel == 3
                  ? "text-violet-600"
                  : enroll?.passLevel == 4
                  ? "text-orange-900"
                  : "text-amber-200"
              }`}
            >
              {toPassLevelStr(enroll?.passLevel)?.status}
            </div>
          </div>
        </div>
        <div>{toDateString(enroll?.updatedAt)}</div>
      </div>
    </Link>
  );
}

export default EnrollCard;