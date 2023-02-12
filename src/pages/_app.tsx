import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";
import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <CookiesProvider>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" enableSystem>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </CookiesProvider>
  );
};

export default MyApp;
