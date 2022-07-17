import { Box, Button, Wrap } from "@chakra-ui/react"
import { ISong, useFirestoreAction } from "../../utils"
import React, { ReactElement, useEffect, useState } from "react"

import SongBox from "../SongBox"

interface Props {
  playlist: ISong[]
  currentSong: number
  isPlaying: boolean
  handelRest: () => void
  roomId: string
}

function VideoPlaylist({
  playlist,
  currentSong,
  isPlaying,
  handelRest,
  roomId,
}: Props): ReactElement {
  const [upcomingSongs, setUpcomingSongs] = useState([])
  const { resetRoom } = useFirestoreAction()

  useEffect(() => {
    setUpcomingSongs(playlist.slice(currentSong))
  }, [playlist, currentSong])
  return (
    <>
      <Wrap p="2" justify="center">
        {upcomingSongs.map((song: ISong, index) => (
          <Box w={[null, "100%", "30%"]}>
            <SongBox
              songData={song}
              isActive={index === 0}
              showModal={() => {}}
              isPlayer
              roomId={roomId}
            />
          </Box>
        ))}
        {currentSong >= playlist.length && (
          <Box w="100vw" textAlign="center">
            <Button onClick={handelRest} size="lg" variant="outline">
              Restart
            </Button>
          </Box>
        )}
      </Wrap>
    </>
  )
}

export default VideoPlaylist
