import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
const ChartWithOutSSR = dynamic(
  () => import("../components/Chart/MainPageChart"),
  {
    ssr: false,
  }
);
function index() {
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
      <ChartWithOutSSR />
    </div>
  );
}

export default index;
