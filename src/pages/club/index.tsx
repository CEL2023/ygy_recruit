import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { getAllClub, IClub } from "../../api/club";
import ClubCard from "../../components/Club/ClubCard";

function Page() {
  const { data, isLoading } = useQuery<any, AxiosError, { data: IClub[] }>({
    queryKey: ["clubs"],
    queryFn: getAllClub,
  });
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="mx-auto items-center justify-center">
          <div className=" mx-2 mt-8 grid gap-1 sm:w-full sm:grid-cols-1 md:mx-auto md:w-fit md:grid-cols-2 lg:grid-cols-3">
            {data?.data?.map((item, index: number) => (
              <ClubCard key={index} club={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
