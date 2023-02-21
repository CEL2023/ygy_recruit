import axios from "axios";
const FetchClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});
// FetchClient.interceptors.response.use(
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
//           const rs = await FetchClient.post<ISignInUser>(
//             "/api/v1/auth/refresh"
//           );
//           const { accessToken } = rs.data.tokens;
//           if (accessToken) {
//             return FetchClient(originalConfig);
//           }
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }

//       if (error.response?.status === 403) {
//         try {
//           await FetchClient.post("/api/v1/auth/signout");
//         } catch (e) {
//           console.log(e);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default FetchClient;
