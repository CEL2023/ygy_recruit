import { RefreshIcon } from "@heroicons/react/outline";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTheme } from "next-themes";
import ApexChart from "react-apexcharts";
import { getAllClubStats, IClubStats } from "../../api/club";
import { toRateStr } from "../../lib/changeToRate";
import { shortenClubName } from "../../lib/shortenClubName";
import BasicLoader from "../Global/Loaders/BasicLoader";
const queryClient = new QueryClient();
function MainPageChart() {
  const { setTheme, systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const { data, isLoading, isRefetching } = useQuery<
    any,
    AxiosError,
    { data: IClubStats[] }
  >({
    queryKey: ["club/stats/all"],
    queryFn: getAllClubStats,
  });
  return (
    <div className=" mx-auto w-3/4">
      <div className="mb-8  flex items-center justify-center gap-2">
        <div className="text-center text-5xl font-bold">경쟁률</div>
        <RefreshIcon
          onClick={async () => {
            await queryClient.refetchQueries(["club/stats/all"]);
          }}
          className=" h-8 w-8 text-center font-bold duration-200 active:rotate-180"
        />
      </div>
      {isLoading || isRefetching ? (
        <BasicLoader />
      ) : (
        <ApexChart
          type="bar"
          series={[
            {
              name: "경쟁률",
              data: data?.data?.map((item) => {
                return {
                  x: item.club.name,
                  y: toRateStr({ enrolls: item.enrolls, limit: item.limit }),
                };
              })!,
            },
          ]}
          options={{
            theme: { mode: currentTheme as "dark" | "light" | undefined },
            chart: {
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: true },
              categories: data?.data?.map((item) =>
                shortenClubName(item.club.name)
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#4338ca"], stops: [0, 100] },
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (value) => `${value} : 1`,
              },
            },
          }}
        />
      )}
      <div className=" text-center text-xl font-semibold">
        이공연 전체 모집 인원 :{" "}
        {data?.data.reduce((acc, curr) => {
          acc += curr.limit;
          return acc;
        }, 0)}
        <br />
        {data?.data.reduce((acc, curr) => {
          acc += curr.enrolls;
          return acc;
        }, 0)}
        개의 지원서 제출됨
      </div>
    </div>
  );
}
export default MainPageChart;
