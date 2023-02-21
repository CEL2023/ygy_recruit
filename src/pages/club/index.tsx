import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { getAllClub } from "../../api/club";
import ClubCard from "../../components/ClubCard";
export interface IMember {
  name: string;
  studentId: number;
  id: number;
  username: string;
  rank: number;
}
export interface ClubLike {
  id: number;
  clubId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClub {
  id: number;
  name: string;
  desc: string;
  bgImg: string;
  clubLikes: ClubLike[];
  members: IMember[];
}
function index() {
  const { data, isLoading } = useQuery<any, AxiosError, { data: IClub[] }>({
    queryKey: ["/club"],
    queryFn: getAllClub,
  });
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="mx-auto items-center justify-center">
          <div className=" mx-auto grid w-fit gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((item, index: number) => (
              <ClubCard key={index} club={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default index;
