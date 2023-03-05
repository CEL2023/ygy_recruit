import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const fetchClient = axios.create({
  baseURL:
    process?.env?.NODE_ENV === "production"
      ? process?.env?.NEXT_PUBLIC_BASE_URL ?? "https://api.kghigh.com"
      : "http://localhost:3000",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

// axios에 넣을 interceptor.응답에 따라 각각 다른 처리를 한다.
// 굳이 axios가 아니더라도 다른 처리를 할 수 있음.

// 응답 인터셉터 추가
fetchClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// fetchClient.interceptors.response.use((response) =>
//   AxiosAuthInterceptor(response)
// );
// fetchClient.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   async function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     const originalConfig = error.config;
//     if (error.response) {
//       if (error.response?.status === 401 && !originalConfig._retry) {
//         console.log("refreshing");
//         originalConfig._retry = true;
//         try {
//           const rs = await fetchClient.post<ISignInUser>(
//             "/api/v1/auth/refresh"
//           );
//           const { accessToken } = rs.data.tokens;
//           if (accessToken) {
//             return fetchClient(originalConfig);
//           }
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }

//       if (error.response?.status === 403) {
//         try {
//           await fetchClient.post("/api/v1/auth/signout");
//         } catch (e) {
//           console.log(e);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default fetchClient;
