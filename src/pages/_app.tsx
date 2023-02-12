import { AppContext, type AppType } from "next/app";
import { type Session } from "next-auth";
import { CookiesProvider } from "react-cookie";
import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setCookie } from "../lib/TokenManager";
const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" enableSystem={true}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
MyApp.getInitialProps = async (ctx: AppContext) => {
  // key의 값을 출력하는 함수를 만듬.
  function getCookie(key: any) {
    let result = null;
    // cookie log를 찍어보면 ;로 구분해서 string 값으로 들어오기 때문에 split으로 나눈다.
    let cookie = ctx?.ctx?.req?.headers?.cookie?.split(";");
    cookie?.some(function (item: any) {
      // 공백을 제거
      item = item.replace(" ", "");

      let dic = item.split("=");

      if (key === dic[0]) {
        result = dic[1];
        return true; // break;
      }
    });
    return result;
  }
  const token = getCookie("accessToken");

  if (token) {
    setCookie(token);
  }
  return {};
};

export default MyApp;
