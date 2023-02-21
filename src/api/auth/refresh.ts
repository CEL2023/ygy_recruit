import { fetcher } from "../fetcher";

export const silentRefresh = async () => {
  try {
    fetcher.post("/api/v1/auth/refresh").then((res) => {
      setInterval(silentRefresh, 4 * 1000 * 60);
    });
  } catch (e) {}
};
