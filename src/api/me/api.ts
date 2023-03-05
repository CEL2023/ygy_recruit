import { fetcher } from "../fetcher";

export const changePassword = async ({
  prevPWD,
  newPWD,
}: {
  prevPWD: string;
  newPWD: string;
}) => {
  return await fetcher.post("/api/v1/me/update-password", {
    prevPWD,
    newPWD,
  });
};
export const changeSId = async ({ studentId }: { studentId: number }) => {
  return await fetcher.patch("/api/v1/me", {
    studentId,
  });
};
