import { fetcher } from "../fetcher";
export interface IFormWithOutContent {
  id: number;
  clubId: number;
  createdAt: Date;
}
export interface IForm extends IFormWithOutContent {
  content: object;
}
export interface ICanEnroll {
  ok: boolean;
  clubId?: number;
  enrollId?: number;
  hasDraft?: boolean;
}
export const createClubForm = async (
  clubId: string | string[],
  content: object
) => {
  try {
    await fetcher.post(`/api/v1/club/${clubId.toString()}/form`, content);
  } catch (e) {}
};
export const canEnrollToClub = async (clubId: string | string[]) => {
  try {
    return await fetcher.get<ICanEnroll>(
      `/api/v1/me/canEnroll/club/${clubId.toString()}`
    );
  } catch (e) {}
};
export const getClubForm = async (clubId: string | string[]) => {
  try {
    const canEnroll = await canEnrollToClub(clubId);
    if (canEnroll?.data?.ok) {
      const formIds = await fetcher.get<IFormWithOutContent[]>(
        `/api/v1/club/${clubId.toString()}/form`
      );
      if (formIds?.data.length == 0)
        return { id: 0, clubId: 0, createdAt: Date.now(), content: {} };
      const [filtedId] = formIds?.data
        .map((item) => {
          return item.id;
        })
        .sort(() => 0.5 - Math.random())!;
      const res = await fetcher.get<IForm>(
        `/api/v1/club/${clubId.toString()}/form/${filtedId}`
      );
      return res;
    }
    if (canEnroll?.data?.hasDraft) {
      window.location.href = `/me/enroll/${canEnroll?.data.enrollId}`;
      return;
    }
  } catch (e) {}
};
export const getClubFormById = async (
  formId: string | string[],
  clubId: string | string[]
) => {
  try {
    return await fetcher.get<IForm>(
      `/api/v1/club/${clubId.toString()}/form/${formId.toString()}`
    );
  } catch (e) {}
};
export const getClubForms = async (clubId: string | string[]) => {
  try {
    return await fetcher.get<IFormWithOutContent[]>(
      `/api/v1/club/${clubId.toString()}/form`
    );
  } catch (e) {}
};
