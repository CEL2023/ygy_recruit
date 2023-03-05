import { fetcher } from "../fetcher";

export interface IFetchMe {
  type: string;
  tokenId: number;
  name: string;
  username: string;
  userId: number;
  studentId: number;
  email: string;
  rank: number;
  clubId?: number;
  isManageAdmin?: boolean;
  iat: number;
  exp: number;
}

export const fetchMe = async () => {
  const data = await fetcher.get<IFetchMe>("/api/v1/me");
  return data;
};
