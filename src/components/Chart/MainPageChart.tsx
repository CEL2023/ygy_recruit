import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTheme } from "next-themes";
import ApexChart from "react-apexcharts";
import { getAllClubStats, IClubStats } from "../../api/club";
import { toRateStr } from "../../lib/changeToRate";
function MainPageChart() {
  const { setTheme, systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
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
                labels: { show: true, style: { colors: "white" } },
                categories: data?.data?.map((item) => item.club.name),
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
                  formatter: (value) => `${value}`,
                },
              },
            }}
          />
          <div className=" text-center text-xl font-semibold">
            이공연 전체 모집 인원{" "}
            {data?.data.reduce((acc, curr) => {
              acc += curr.limit;
              return acc;
            }, 0)}
            명 중{" "}
            {data?.data.reduce((acc, curr) => {
              acc += curr.enrolls;
              return acc;
            }, 0)}
            명 지원
          </div>
        </div>
      )}
    </div>
  );
}
export default MainPageChart;
