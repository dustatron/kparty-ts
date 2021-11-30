import { useEffect } from "react"
import Hero from "../components/Hero"
import KrystalWrapper from "../components/KrystalWrapper"
import styles from "../styles/Home.module.css"
import { IRoom } from "../utils"

interface Props {
  setTitle: (title: string) => void
  roomsList?: IRoom[]
}

export default function Home({ setTitle, roomsList }: Props) {
  return (
    <>
      <Hero setTitle={setTitle} roomsList={roomsList} />
      {/* <KrystalWrapper setTitle={setTitle} /> */}
    </>
  )
}
