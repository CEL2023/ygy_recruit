import Link from "next/link";
import { type IEnroll } from "../../api/enroll/api";
import { toDateString } from "../../lib/dateFormat";
import { toPassLevelStr } from "../../lib/passLevelToStr";

function AdminEnrollCard({
  enroll,
  clubId,
}: {
  enroll: IEnroll;
  clubId: string | string[];
}) {
  return (
    <div className=" w-full rounded-xl py-3 px-4 shadow-lg ">
      <div className="flex justify-between">
        <Link
          href={`/club/${clubId.toString()}/admin/enroll/${enroll?.id?.toString()}`}
          className="flex-col justify-between gap-2 hover:text-indigo-400 sm:flex sm:px-6"
        >
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
                {toPassLevelStr(enroll?.passLevel).status}
              </div>
            </div>
          </div>
          <div>{toDateString(enroll?.updatedAt)}</div>
        </Link>
        <div>
          <select>
            {Array.from(Array(5), (_, index) => {
              return (
                <option key={index} value={index}>
                  {toPassLevelStr(index).status}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default AdminEnrollCard;
