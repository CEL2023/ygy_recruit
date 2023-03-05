import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { getAllClubStats, IClubStats } from "../../api/club";
import { toRateStr } from "../../lib/changeToRate";

function RateChart() {
  const { data, isLoading } = useQuery<any, AxiosError, { data: IClubStats[] }>(
    {
      queryKey: ["club/stats/all"],
      queryFn: getAllClubStats,
    }
  );
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className=" mx-auto w-3/4">
          <div className="my-8 text-center text-6xl font-bold">경쟁률</div>
          <div className=" flex flex-col items-center justify-center">
            {data?.data
              .sort((a, b) => {
                if (
                  toRateStr({ enrolls: a.enrolls, limit: a.limit }) >
                  toRateStr({ enrolls: b.enrolls, limit: b.limit })
                ) {
                  return -1;
                }
                if (
                  toRateStr({ enrolls: a.enrolls, limit: a.limit }) <
                  toRateStr({ enrolls: b.enrolls, limit: b.limit })
                ) {
                  return 1;
                }
                return 0;
              })
              .map((item, index) => (
                <div
                  key={index}
                  className="flex w-full justify-between p-4 text-4xl font-bold "
                >
                  <div>{index}</div>
                  <div>{item.club.name}</div>
                  <div>
                    {toRateStr({ enrolls: item.enrolls, limit: item.limit })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RateChart;
