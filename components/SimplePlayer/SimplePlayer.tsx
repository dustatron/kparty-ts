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
        volume={0.2}
        url={link}
        height="50vh"
        width="100%"
      />
    </>
  )
}

export default SimplePlayer
