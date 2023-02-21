import Link from "next/link";
import React from "react";
import { IEnroll } from "../api/enroll";
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
      href={`/club/${clubId}/admin/enroll/${enroll.id}`}
    >
      <div className="flex justify-between gap-2 rounded-lg py-4 px-2 shadow-lg">
        <div className="flex gap-4">
          <div>{enroll.id}</div>
          <div className="flex gap-2">
            <div>{enroll.User.name}</div>
            <div>{enroll.User.username}</div>
            <div>{enroll.User.studentId}</div>
            <div
              className={`${
                enroll.passLevel == 1
                  ? "text-red-600"
                  : enroll.passLevel == 2
                  ? "text-green-500"
                  : enroll.passLevel == 3
                  ? "text-violet-600"
                  : enroll.passLevel == 4
                  ? "text-orange-900"
                  : "text-amber-200"
              }`}
            >
              {toPassLevelStr(enroll.passLevel).status}
            </div>
          </div>
        </div>

        <div>{toDateString(enroll.updatedAt)}</div>
      </div>
    </Link>
  );
}

export default EnrollCard;
