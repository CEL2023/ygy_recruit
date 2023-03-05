import { IField } from "../../pages/club/[clubId]/admin/form/create";
import { fetcher } from "../fetcher";
export interface IFormWithOutContent {
  id: number;
  clubId: number;
  createdAt: Date;
}
export interface IForm extends IFormWithOutContent {
  content: IField[];
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
  await fetcher.post(`/api/v1/club/${clubId.toString()}/form`, content);
};
export const editClubForm = async (
  clubId: string | string[],
  formId: string | string[],
  content: object
) => {
  await fetcher.patch(
    `/api/v1/club/${clubId.toString()}/form/${formId}`,
    content
  );
};
export const deleteClubForm = async (
  clubId: string | string[],
  formId: string | string[]
) => {
  await fetcher.delete(`/api/v1/club/${clubId.toString()}/form/${formId}`);
};
export const canEnrollToClub = async (clubId: string | string[]) => {
  return await fetcher.get<ICanEnroll>(
    `/api/v1/me/canEnroll/club/${clubId.toString()}`
  );
};
export const getClubForm = async (clubId: string | string[]) => {
  const formIds = await fetcher.get<IFormWithOutContent[]>(
    `/api/v1/club/${clubId.toString()}/form`
  );
  if (formIds?.data.length == 0) return null;
  const res = await fetcher.get<IForm>(
    `/api/v1/club/${clubId.toString()}/form/${formIds?.data[0]?.id}`
  );
  return res;
};
export const getClubFormById = async (
  clubId: string | string[],
  formId: string | string[]
) => {
  return await fetcher.get<IForm>(
    `/api/v1/club/${clubId.toString()}/form/${formId.toString()}`
  );
};
export const getClubForms = async (clubId: string | string[]) => {
  return await fetcher.get<IFormWithOutContent[]>(
    `/api/v1/club/${clubId.toString()}/form`
  );
};
