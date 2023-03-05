import React from "react";
import { type IClubStats } from "../../api/club";
import StatCard from "./StatCard";
interface StatRowProp {
  data: IClubStats;
}
function StatRow({ data }: StatRowProp) {
  return (
    <div className="mx-auto flex flex-col justify-center rounded-lg  md:flex-row">
      <StatCard
        className="rounded-t-xl md:rounded-l-xl md:rounded-t-none md:rounded-tl-lg"
        label="좋아요"
        count={data?.likes || 0}
      />
      <StatCard label="지원자" count={data?.enrolls || 0} />
      <StatCard
        className="rounded-b-xl md:rounded-r-xl md:rounded-b-none md:rounded-br-xl"
        label={"경쟁률"}
        count={Math.round((data?.enrolls / data?.limit) * 10) / 10}
      />
    </div>
  );
}

export default StatRow;
