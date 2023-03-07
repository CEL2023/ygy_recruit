import Link from "next/link";
import React, { useEffect, useState } from "react";
import { type IEnroll } from "../../api/enroll/api";
import { clubIdToStr } from "../../lib/clubIdToStr";
import { toDateString } from "../../lib/dateFormat";
import { toPassLevelStr } from "../../lib/passLevelToStr";

function EnrollCard({ enroll }: { enroll: IEnroll }) {
  const [clubname, setClubName] = useState("");
  const toName = async () => {
    const data = await clubIdToStr(enroll.clubId.toString());
    setClubName(data);
  };
  useEffect(() => {
    toName();
  }, [enroll]);
  return (
    <Link
      className="duration-300 hover:-translate-y-1"
      href={`/me/enroll/${enroll?.id.toString()}`}
    >
      <div className="flex-col justify-between gap-2 rounded-xl py-3 px-4 shadow-lg sm:flex sm:px-6">
        <div className="flex gap-4">
          <div className="flex gap-2">
            <div>{clubname}</div>
            <div>{enroll.isEditCompleted ? null : "임시저장됨"}</div>
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
              {toPassLevelStr(enroll?.passLevel)?.status}
            </div>
          </div>
        </div>
        <div>{toDateString(enroll?.updatedAt)}에 제출됨</div>
      </div>
    </Link>
  );
}

export default EnrollCard;
