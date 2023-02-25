import { fetcher } from "../api/fetcher";

export const clubIdToStr = async (id: string | string[]) => {
  try {
    const name = await fetcher.get<{ name: string }>(
      `/api/v1/club/${id.toString()}/name`
    );
    return name?.data?.name;
  } catch (e) {}
};
