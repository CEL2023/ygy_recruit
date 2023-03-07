import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
const ChartWithOutSSR = dynamic(
  () => import("../components/Chart/MainPageChart"),
  {
    ssr: false,
  }
);
function index() {
  const [hour, setHour] = useState(23);
  const [min, setMin] = useState(59);
  const [sec, setSec] = useState(59);
  const time = useRef(Math.round((1678287600000 - Date.now()) / 1000));
  const timerId = useRef<NodeJS.Timer>();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setHour(Math.round(time.current / 3600));
      setMin(Math.round((time.current % 3600) / 60));
      setSec(Math.round(time.current % 60));
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= 0) {
      clearInterval(timerId.current);
    }
  }, [sec]);
  return (
    <div>
      <div className="relative h-96 w-full">
        <Image
          src={"/ferris.jpg"}
          alt=""
          className=" object-cover"
          fill
          priority
          sizes=""
        />
      </div>
      <div className=" m-4 flex items-center justify-center gap-2 text-center text-4xl font-thin">
        <div>서류마감까지</div>
        <div>
          {hour}시간 {min}분 {sec}초 남음
        </div>
      </div>
      <ChartWithOutSSR />
    </div>
  );
}

export default index;
