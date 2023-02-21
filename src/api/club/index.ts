import { fetcher } from "../fetcher";

export const getAllClub = async () => {
  return await fetcher.get("/api/v1/club");
};
export const getClub = async (id: number) => {
  return await fetcher.get(`/api/v1/club/${id}`);
};
export const changeLike = async (isLiked: boolean, clubId: string) => {
  if (isLiked) return await fetcher.delete(`/api/v1/club/${clubId}/likes`);
  return await fetcher.post(`/api/v1/club/${clubId}/likes`);
};
