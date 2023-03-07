import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
      <Carousel
        autoPlay
        interval={4000}
        swipeable
        infiniteLoop
        showArrows={false}
        emulateTouch
        showStatus={false}
        showIndicators={false}
      >
        <div className="relative h-96 w-full">
          <Image
            fill
            priority
            className=" object-cover"
            src={`https://enrollimages.s3.ap-northeast-2.amazonaws.com/Main_${1}.jpeg`}
            alt={`MAIN_${1}`}
          />
        </div>
        <div className="relative h-96 w-full">
          <Image
            fill
            priority
            className=" object-cover"
            src={`https://enrollimages.s3.ap-northeast-2.amazonaws.com/Main_${2}.jpeg`}
            alt={`MAIN_${2}`}
          />
        </div>
        <div className="relative h-96 w-full">
          <Image
            fill
            priority
            className=" object-cover"
            src={`https://enrollimages.s3.ap-northeast-2.amazonaws.com/Main_${3}.jpeg`}
            alt={`MAIN_${3}`}
          />
        </div>
      </Carousel>
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
