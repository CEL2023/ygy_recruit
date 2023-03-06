import { fetcher } from "../fetcher";
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
  Social: ISocialInfo[];
}
export interface ISocialInfo {
  id: number;
  type: string;
  link: string;
}
export interface IClubInfo {
  id: number;
  name: string;
  desc: string;
  bgImg: string;
}
export interface IClubStats {
  [index: string]: any;
  id: number;
  clubId: number;
  likes: number;
  enrolls: number;
  limit: number;
  updatedAt: Date;
  club: IClubInfo;
}

export const getAllClub = async () => {
  return await fetcher.get<IClub[]>("/api/v1/club");
};
export const getClub = async (id: number) => {
  return await fetcher.get<IClub>(`/api/v1/club/${id}`);
};
export const changeLike = async (isLiked: boolean, clubId: string) => {
  if (isLiked)
    return await fetcher.delete(`/api/v1/club/${clubId.toString()}/likes`);
  return await fetcher.post<IClubStats>(
    `/api/v1/club/${clubId.toString()}/likes`
  );
};
export const getClubStats = async (clubId: string | string[]) => {
  return await fetcher.get<IClubStats>(
    `/api/v1/club/${clubId.toString()}/stats`
  );
};
export const getAllClubStats = async () => {
  return await fetcher.get<IClubStats[]>(`/api/v1/club/stats`);
};
export const mutateClubInfo = async (
  clubId: string | string[],
  desc?: string,
  bgimg?: string
) => {
  return await fetcher.patch(`/api/v1/club/${clubId.toString()}`, {
    bgimg,
    desc,
  });
};
