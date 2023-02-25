import fetchClient from "./axiosClient";

export const fetcher = {
  async get<T>(url: string) {
    try {
      const response = await fetchClient.get<T>(url);
      const data = await response.data;
      const { headers } = response;

      return {
        data,
        headers,
      };
    } catch (e: any) {}
  },
  async post<T>(url: string, body?: any) {
    try {
      const response = await fetchClient.post<T>(url, body ?? null);
      const data = await response.data;
      const { headers } = response;

      return {
        data,
        headers,
      };
    } catch (e: any) {}
  },
  async patch<T>(url: string, body: any) {
    try {
      const response = await fetchClient.patch<T>(url, body ?? null);
      const data = await response.data;
      const { headers } = response;

      return {
        data,
        headers,
      };
    } catch (e: any) {}
  },
  async delete<T>(url: string) {
    try {
      const response = await fetchClient.delete<T>(url);
      const data = await response.data;
      const { headers } = response;

      return {
        data,
        headers,
      };
    } catch (e: any) {}
  },
};
