import { useEffect } from "react"
import Hero from "../components/Hero"
import KrystalWrapper from "../components/KrystalWrapper"
import styles from "../styles/Home.module.css"

export default function Home({ setTitle }) {
  return (
    <>
      <Hero setTitle={setTitle} />
      {/* <KrystalWrapper setTitle={setTitle} /> */}
    </>
  )
}
