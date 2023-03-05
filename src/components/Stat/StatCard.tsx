import React from "react";

interface StatProps {
  label: string;
  count: number;
  className?: string;
}

function StatCard({ label, count, className }: StatProps) {
  return (
    <div
      className={`${className} mx-auto flex w-full flex-row items-center justify-around md:flex-col md:justify-center md:bg-gray-500 md:bg-opacity-10 md:p-20 `}
    >
      <div className="text-left text-3xl font-semibold md:text-center">
        {label}
      </div>
      <div className=" text-left text-3xl font-bold md:text-center">
        {label == "경쟁률" ? `${count.toString()} : 1` : count}
      </div>
    </div>
  );
}

export default StatCard;
