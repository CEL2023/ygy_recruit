import { type AppContext, type AppProps } from "next/app";
import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import TokenCore from "../components/TokenCore";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({});

const MyApp = ({
  Component,
  pageProps: { isLoggedIn, ...pageProps },
}: AppProps<{ isLoggedIn: boolean }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider attribute="class" enableSystem={true}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <TokenCore isLoggedIn={isLoggedIn} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const data = ctx.res?.getHeader("isLoggedIn");
  ctx.res?.removeHeader("isLoggedIn");
  pageProps = {
    isLoggedIn: data === "true" ? true : false,
    ...pageProps,
  };

  return { pageProps };
};

export default MyApp;
