import { fetcher } from "../fetcher";

export interface IFetchMe {
  type: string;
  tokenId: number;
  name: string;
  profImg: string;
  username: string;
  userId: number;
  studentId: number;
  email: string;
  rank: number;
  iat: number;
  exp: number;
}

export const fetchMe = async () => {
  try {
    const data = await fetcher.get<IFetchMe>("/api/v1/me");
    return data;
  } catch (e) {}
};
