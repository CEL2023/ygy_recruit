import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { fetchMe } from "../api/auth/fetchMe";
import { silentRefresh } from "../api/auth/refresh";
import { useUserStore } from "../zustand/User";

function TokenCore({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    const setUserState = async () => {
      const data = await fetchMe();
      setUser(data?.data!);
    };
    const initialLoad = async () => {
      await setUserState();
      setTimeout(silentRefresh, 4 * 1000 * 60);
    };
    const refresh = async () => {
      await silentRefresh();
    };
    if (
      (window.performance.getEntries()[0] as PerformanceNavigationTiming)
        .type == "reload" &&
      user
    ) {
      refresh();
      return;
    }
    if (user) return;
    if (isLoggedIn) {
      initialLoad();
    } else setUser(null);
  }, [isLoggedIn]);
  return null;
}

export default TokenCore;
