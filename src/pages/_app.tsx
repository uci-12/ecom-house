import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "@/styles/globals.css";
import DeviceProvider from "@/contexts/device-provider";
import Layout from "@/components/layout";
import type { AppProps } from "next/app";

export type MainProps = {
  dehydratedState: DehydratedState;
};

export default function App({ Component, pageProps }: AppProps<MainProps>) {
  const { dehydratedState } = pageProps;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <ChakraProvider theme={theme} resetCSS>
          <DeviceProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DeviceProvider>
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
