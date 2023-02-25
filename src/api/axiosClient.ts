import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const fetchClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

// axios는 400 이상의 status 가 오면 다 에러를 리턴한다.
// 이를 커스텀 할 수 있도록 하여 개발자가 정의한 에러일 때만 에러를 던질 수 있도록 인수를 받는다.
export interface RequestConfig extends AxiosRequestConfig {
  suppressStatusCode?: number[];
}

// axios에 넣을 interceptor.응답에 따라 각각 다른 처리를 한다.
// 굳이 axios가 아니더라도 다른 처리를 할 수 있음.

fetchClient.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 경우 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
fetchClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 오류가 있는 작업 수행
    if (error.response.data.message) {
      error.message = error.response.data.message;
    }
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
