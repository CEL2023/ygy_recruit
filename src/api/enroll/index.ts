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
  createdAt: string;
  updatedAt: string;
  User: ISeekUser;
}

export const getAllSubmittedEnroll = async (clubId: string | string[]) => {
  try {
    const res = await fetcher.get<IEnroll[]>(
      `/api/v1/club/${clubId}/submittedEnroll`
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
      `/api/v1/club/${clubId}/enroll/${enrollId}`
    );
    return res;
  } catch (e) {}
};

export const getMyEnroll = async () => {
  try {
    return await fetcher.get<IEnroll[]>("/api/v1/club/enroll");
  } catch (e) {}
};
