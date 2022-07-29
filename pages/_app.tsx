import "../styles/globals.css";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { queryClient } from "../src/api";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
