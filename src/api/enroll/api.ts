import { fetcher } from "../fetcher";
interface ISeekUser {
  name: string;
  username: string;
  studentId: number;
}
export interface IEnroll {
  id: number;
  clubId: number;
  formId: number;
  userId: number;
  data: object;
  isEditCompleted: boolean;
  passLevel: number;
  finalRegister?: any;
  createdAt: Date | string;
  updatedAt: Date | string;
  User: ISeekUser;
}

export const getAllSubmittedEnroll = async (clubId: string | string[]) => {
  try {
    const res = await fetcher.get<IEnroll[]>(
      `/api/v1/club/${clubId.toString()}/submittedEnroll`
    );
    return res;
  } catch (e) {}
};
export const getClubSubmittedEnroll = async (
  clubId: string | string[],
  enrollId: string | string[]
) => {
  try {
    const res = await fetcher.get<IEnroll[]>(
      `/api/v1/club/${clubId.toString()}/enroll/${enrollId.toString()}`
    );
    return res;
  } catch (e) {}
};

export const getMyEnrolls = async () => {
  try {
    return await fetcher.get<IEnroll[]>("/api/v1/me/enrolls");
  } catch (e) {}
};

export const submitEnroll = async (
  clubId: number,
  formId: number,
  isEditCompleted: boolean = false,
  data: object = {}
) => {
  try {
    return await fetcher.post(`/api/v1/club/${clubId.toString()}/enroll`, {
      formId,
      isEditCompleted,
      data,
    });
  } catch (e) {}
};
