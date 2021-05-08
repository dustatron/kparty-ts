import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import "../styles/globals.css";
import type { AppProps /*, AppContext */ } from "next/app";

function App({ Component, pageProps }: AppProps) {
  const [subTitle, setSubTitle] = useState("");
  return (
    <ChakraProvider>
      <Head>
        <title>K Party</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar heading={subTitle} />
      <Component {...pageProps} setTitle={setSubTitle} />
    </ChakraProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default App;
