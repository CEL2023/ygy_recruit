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
  priority?: number;
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
  const res = await fetcher.get<IEnroll[]>(
    `/api/v1/club/${clubId.toString()}/submittedEnroll`
  );
  return res;
};

export const getAllSavedEnroll = async (clubId: string | string[]) => {
  const res = await fetcher.get<IEnroll[]>(
    `/api/v1/club/${clubId.toString()}/savedPassLevel`
  );
  return res;
};
export const getClubSubmittedEnroll = async (
  clubId: string | string[],
  enrollId: string | string[]
) => {
  const res = await fetcher.get<IEnroll[]>(
    `/api/v1/club/${clubId.toString()}/enroll/${enrollId.toString()}`
  );
  return res;
};

export const getMyEnrolls = async () => {
  return await fetcher.get<IEnroll[]>("/api/v1/me/enrolls");
};
export const getMyEnroll = async (enrollId: string | string[]) => {
  return await fetcher.get<IEnroll[]>(`/api/v1/me/enroll/${enrollId}`);
};

export const submitEnroll = async (
  formId: number,
  clubId: number,
  isEditCompleted: boolean = false,
  priority: number,
  data: object = {}
) => {
  return await fetcher.post(`/api/v1/club/${clubId.toString()}/enroll`, {
    formId,
    isEditCompleted,
    priority,
    data: JSON.stringify(data),
  });
};
export const editEnroll = async (
  formId: number,
  clubId: number,
  enrollId: string,
  isEditCompleted: boolean = false,
  data: object = {},
  priority?: number
) => {
  return await fetcher.patch(
    `/api/v1/club/${clubId.toString()}/enroll/${enrollId}`,
    {
      formId,
      isEditCompleted,
      data: JSON.stringify(data),
      priority,
    }
  );
};

export const enrollStatusChange = async (
  clubId: string | string[],
  enrollId: string | string[],
  passLevel: number
) => {
  await fetcher.post(
    `/api/v1/club/${clubId}/admin/enroll/${enrollId}/preupdate`,
    {
      passLevel,
    }
  );
};
export const finalRegister = async (enrollId: string | string[]) => {
  await fetcher.post(`/api/v1/me/enroll/${enrollId}/finalRegister`);
};
