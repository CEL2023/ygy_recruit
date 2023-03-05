import { fetcher } from "../api/fetcher";

export const clubIdToStr = async (id: string | string[]) => {
  const name = await fetcher.get<{ name: string }>(
    `/api/v1/club/${id.toString()}/name`
  );
  return name?.data?.name;
};
