import { Cookies } from "react-cookie";

const cookies = new Cookies();
let _cookie = "";

export function setClientCookie(cookie: string) {
  _cookie = cookie;
}

export function clearCookie() {
  _cookie = "";
}
export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
export const removeCookieToken = (name: string) => {
  return cookies.remove(name, { sameSite: "strict", path: "/" });
};
