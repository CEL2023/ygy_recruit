import { type AppContext, type AppProps } from "next/app";
import Layout from "../components/Global/layout";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import TokenCore from "../components/Global/TokenCore";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalModal from "../components/Global/GlobalModal";
import Ask from "../components/Global/Ask";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import ErrorPage from "../components/Error/ErrorPage";
import Priority from "../components/Global/Priority";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

const MyApp = ({
  Component,
  pageProps: { isLoggedIn, ...pageProps },
}: AppProps<{ isLoggedIn: boolean }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider attribute="class" enableSystem={true}>
        <GlobalModal />
        <Ask />
        <Priority />
        <Layout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
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
