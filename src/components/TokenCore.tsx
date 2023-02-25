import { useEffect, useState } from "react";
import { fetchMe } from "../api/auth/fetchMe";
import { fetcher } from "../api/fetcher";
import useWindowFocus from "../hooks/useWindowFocus";
import { useUserStore } from "../zustand/User";

function TokenCore({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { user, setUser } = useUserStore();
  const [rtSchedule, setRtSchedule] = useState<NodeJS.Timeout>();
  const isFocused = useWindowFocus();
  const silentRefresh = async () => {
    try {
      await fetcher.post("/api/v1/auth/refresh").then((res) => {
        const data = setTimeout(silentRefresh, 4 * 1000 * 60);
        setRtSchedule(data);
      });
    } catch (e) {}
  };

  const setUserState = async () => {
    const data = await fetchMe();
    setUser(data?.data!);
  };
  const refresh = async () => {
    await clearTimeout(rtSchedule);
    await silentRefresh();
    if (!user) await setUserState();
  };
  useEffect(() => {
    if (isFocused) {
      refresh();
    }
    if (user) return;
    if (
      (window.performance.getEntries()[0] as PerformanceNavigationTiming)
        .type == "reload" &&
      user
    ) {
      refresh();
      return;
    }
    if (isLoggedIn) {
      refresh();
    } else setUser(null);
  }, [isLoggedIn, isFocused]);
  return null;
}

export default TokenCore;
