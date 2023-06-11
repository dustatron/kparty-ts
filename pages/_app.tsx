import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps /*, AppContext */ } from "next/app";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { AuthProvider, IRoom, useFirestoreAction } from "../utils";
import { QueryClient, QueryClientProvider } from "react-query";

function App({ Component, pageProps }: AppProps) {
  const { getAllRooms, roomsList: fullRoomList } = useFirestoreAction();
  const [subTitle, setSubTitle] = useState("");
  const [roomsList, setRoomsList] = useState<IRoom[]>();

  useEffect(() => {
    getAllRooms();
  }, []);

  useEffect(() => {
    if (fullRoomList?.length > 0) {
      setRoomsList(fullRoomList);
    }
  }, [fullRoomList]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <Head>
            <title>KParty</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar heading={subTitle} />
          <Component
            {...pageProps}
            setTitle={setSubTitle}
            roomsList={roomsList}
          />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
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
