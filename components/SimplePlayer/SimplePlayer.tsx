import React from "react"
import ReactPlayer from "react-player"

interface Props {
  link: string
}

const SimplePlayer = ({ link }: Props) => {
  return (
    <>
      <ReactPlayer
        controls
        // playing={}
        url={link}
        height="100%"
        width="1000%"
        // onEnded={nextSong}
        // onPlay={() => {
        //   setIsPlaying(true)
        // }}
        // onPause={() => {
        //   setIsPlaying(false)
        // }}
      />
    </>
  )
}

export default SimplePlayer
