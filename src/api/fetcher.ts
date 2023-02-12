import axios, { AxiosResponse } from "axios";

let _cookie = "";

export function setClientCookie(cookie: string) {
  _cookie = cookie;
}

export function clearCookie() {
  _cookie = "";
}
export function consumeCookie(request: Request) {
  const cookie = request.headers.get("Cookie");
  if (cookie) {
    setClientCookie(cookie);
  }
}
export function isOk(status: number) {}
export class FetchError extends Error {
  constructor(public response: AxiosResponse, public data: any) {
    super(`Fetch failed with status ${response.status}`);
  }
}
async function rejectIfNeeded(response: AxiosResponse) {
  if (!(response.status >= 200 && response.status < 300)) {
    const data = await response.data;
    throw new FetchError(response, data);
  }
  return response;
}
export const FetchClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});
export const fetcher = {
  async get<T>(url: string) {
    const response = await FetchClient.get<T>(url);
    await rejectIfNeeded(response);
    const data: T = await response.data;
    const { headers } = response;
    return {
      data,
      headers,
    };
  },
  async post<T>(url: string, body?: any) {
    const response = await FetchClient.post<T>(url, body ?? null);
    await rejectIfNeeded(response);
    const data = await response.data;
    const { headers } = response;
    return {
      data,
      headers,
    };
  },
  async patch<T>(url: string, body: any) {
    const response = await FetchClient.patch<T>(url, JSON.stringify(body));
    await rejectIfNeeded(response);
    const data: T = await response.data;
    const { headers } = response;
    return {
      data,
      headers,
    };
  },
  async delete<T>(url: string) {
    const response = await FetchClient.delete<T>(url);
    await rejectIfNeeded(response);
    const data: T = await response.data;
    const { headers } = response;
    return {
      data,
      headers,
    };
  },
};
