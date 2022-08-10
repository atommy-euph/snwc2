import { useRouter } from "next/router";
import { useEffect } from "react";
import "../styles/globals.css";
import Head from "next/head";

import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="しりとりで知る鉄道駅 - 「尻鉄」はしりとりを通じて全国の駅名に詳しくなれるタイムアタックゲームです"
        />
        {/* Icons  */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/apple-touch-icon-180x180.png"
        />
        <link rel="icon" type="image/png" href="/icon-192x192.png" />
        {/* <!-- OGP setting --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shiritetsu.railword.com" />
        <meta property="og:title" content="尻鉄 | しりとりで知る鉄道駅" />
        <meta
          property="og:description"
          content="「尻鉄」はしりとりを通じて全国の駅名に詳しくなれるタイムアタックゲームです"
        />
        <meta
          property="og:image"
          content="https://shiritetsu.railword.com/ogp.png"
        />
        <meta name="twitter:card" content="summary" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
