import Head from "next/head";
import { Box, Container, Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>K Party</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
    </>
  );
}
