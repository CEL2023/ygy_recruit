import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Carousel } from "react-responsive-carousel";

function MainCarousel() {
  return (
    <Carousel autoPlay interval={4000}>
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
  );
}

export default MainCarousel;
