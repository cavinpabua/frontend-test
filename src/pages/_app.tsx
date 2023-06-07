import "antd/dist/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import NextNProgress from "nextjs-progressbar";
import themeConfig from "@/themeConfig";
import PrivateLayout from "@/components/Shared/PrivateLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={themeConfig}>
      <NextNProgress
        color={themeConfig.token.colorPrimary}
        options={{ showSpinner: false }}
      />

      {pageProps.showSideBar ? (
        <PrivateLayout>
          <Component {...pageProps} />
        </PrivateLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </ConfigProvider>
  );
}
