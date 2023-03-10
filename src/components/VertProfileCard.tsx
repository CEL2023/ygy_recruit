import Link from "next/link";
import { type IMember } from "../api/club";
import { toRankString } from "../lib/rankToStr";

function VertProfileCard({ user }: { user: IMember | null }) {
  return (
    <div className="focus:shadow-outline h-10 items-center justify-center break-words rounded py-1 px-4 text-base font-bold">
      <div className="flex items-center justify-center gap-2">
        <div className="items-center justify-center text-center">
          {toRankString(user?.rank ?? 0)}
        </div>
        <div className="items-center justify-center text-center">
          {user?.studentId}
        </div>
        <div className="items-center justify-center text-center">
          {user?.name}
        </div>
      </div>
    </div>
  );
}

export default VertProfileCard;
