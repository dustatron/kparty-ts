import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import "../styles/globals.css";
import type { AppProps /*, AppContext */ } from "next/app";
import { firebaseConfig } from "../utils/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function onAuthStateChange(setUser) {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser({ loggedIn: true });
      console.log("The user is logged in");
    } else {
      setUser({ loggedIn: false });
      console.log("The user is not logged in");
    }
  });
}

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState({ loggedIn: false });
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ChakraProvider>
      <Head>
        <title>K Party</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        heading={subTitle}
        signIn={signInWithGoogle}
        signOut={signOut}
        isLoggedIn={user.loggedIn}
      />
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
