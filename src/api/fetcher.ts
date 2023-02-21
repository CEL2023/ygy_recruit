import axios, { AxiosError, AxiosResponse } from "axios";
import FetchClient from "./axiosClient";

export class FetchError extends Error {
  constructor(public response: AxiosResponse, public data: any) {
    super(`Fetch failed with status ${response.status}`);
  }
}
async function rejectIfNeeded(error: AxiosError) {
  return error;
}

export const fetcher = {
  async get<T>(url: string) {
    try {
      const response = await FetchClient.get<T>(url);
      const data = await response.data;
      const { headers } = response;

      return {
        data,
        headers,
      };
    } catch (e: any) {
      await rejectIfNeeded(e);
    }
  },
  async post<T>(url: string, body?: any) {
    try {
      const response = await FetchClient.post<T>(url, body ?? null);
      const data = await response.data;
      const { headers } = response;

      return {
        data,
        headers,
      };
    } catch (e: any) {
      await rejectIfNeeded(e);
    }
  },
  async patch<T>(url: string, body: any) {
    try {
      const response = await FetchClient.patch<T>(url, body ?? null);
      const data = await response.data;
      const { headers } = response;

      return {
        data,
        headers,
      };
    } catch (e: any) {
      await rejectIfNeeded(e);
    }
  },
  async delete<T>(url: string) {
    try {
      const response = await FetchClient.delete<T>(url);
      const data = await response.data;
      const { headers } = response;

      return {
        data,
        headers,
      };
    } catch (e: any) {
      await rejectIfNeeded(e);
    }
  },
};
