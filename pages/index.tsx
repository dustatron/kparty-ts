import { useEffect } from "react";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";

export default function Home({ setTitle }) {
  return (
    <>
      <Hero setTitle={setTitle} />
    </>
  );
}
