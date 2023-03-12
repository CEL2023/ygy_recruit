import { useEffect, useState } from "react";
import { useHideStore } from "../zustand/HideStore";

export const useHide = (s: any, cb: any) => {
  const res = s(cb);
  const [state, setState] = useState();
  useEffect(() => {
    setState(res);
  }, [res]);
  return res;
};
