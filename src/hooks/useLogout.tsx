import { useRouter } from "next/router";
import { fetcher } from "../api/fetcher";

export const useLogout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetcher.post("/api/v1/auth/signout");
    } catch (e) {
      console.log(e);
    }
    await router.push("/");
    router.reload();
  };
  return handleLogout;
};
