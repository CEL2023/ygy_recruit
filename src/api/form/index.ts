import { fetcher } from "../fetcher";
export interface IFormWithOutContent {
  id: number;
  clubId: number;
  createdAt: Date;
}
export const createClubForm = async (
  clubId: string | string[],
  content: object
) => {
  try {
    await fetcher.post(`/api/v1/club/${clubId}/form`, content);
  } catch (e) {}
};

export const getClubForm = async (clubId: string | string[]) => {
  try {
    const formIds = await fetcher.get<IFormWithOutContent[]>(
      `/api/v1/club/${clubId}/form`
    );
    const [filtedId] = formIds?.data
      .map((item) => {
        return item.id;
      })
      .sort(() => 0.5 - Math.random())!;
    const res = await fetcher.get(`/api/v1/club/${clubId}/form/${filtedId}`);
    return res;
  } catch (e) {}
};
