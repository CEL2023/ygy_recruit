import fetchClient from "./axiosClient";

export const fetcher = {
  async get<T>(url: string) {
    const response = await fetchClient.get<T>(url);
    const data = await response.data;
    const { headers } = response;

    return {
      data,
      headers,
    };
  },
  async post<T>(url: string, body?: any) {
    const response = await fetchClient.post<T>(url, body ?? null);
    const data = await response.data;
    const { headers } = response;

    return {
      data,
      headers,
    };
  },
  async patch<T>(url: string, body: any) {
    const response = await fetchClient.patch<T>(url, body ?? null);
    const data = await response.data;
    const { headers } = response;

    return {
      data,
      headers,
    };
  },
  async delete<T>(url: string) {
    const response = await fetchClient.delete<T>(url);
    const data = await response.data;
    const { headers } = response;

    return {
      data,
      headers,
    };
  },
};
