import React, { FC } from "react"
import { FaPause, FaPlay, FaForward, FaBackward } from "react-icons/fa"
import { IRoom } from "../../utils"
import ReactPlayer from "react-player"
import { VStack, HStack, Button, Center, Icon } from "@chakra-ui/react"

type Props = {
  roomData: IRoom
  isPlaying: boolean
  setIsPlaying: (bool) => void
  nextSong: () => void
  previousSong: () => void
  isLoading: boolean
}

const VideoPlayer: FC<Props> = ({
  roomData,
  isPlaying,
  setIsPlaying,
  nextSong,
  previousSong,
  isLoading,
}) => {
  const { currentSong, playlist } = roomData

  return (
    <VStack spacing={0} align="stretch">
      <Center bg="#4A4A4A" h="31rem">
        {playlist[currentSong]?.link && (
          <ReactPlayer
            controls
            playing={isPlaying}
            url={playlist[currentSong]?.link}
            height="100%"
            width="1000%"
            onEnded={nextSong}
            onPlay={() => {
              setIsPlaying(true)
            }}
            onPause={() => {
              setIsPlaying(false)
            }}
          />
        )}
      </Center>
      <HStack bg="#333" p="2" justify="center">
        <Button
          colorScheme="blackAlpha"
          onClick={previousSong}
          isLoading={isLoading}
          disabled={roomData?.currentSong === 0}
        >
          <Icon as={FaBackward} h={5} w={5} />
        </Button>
        <Button
          colorScheme="blackAlpha"
          isLoading={isLoading}
          disabled={isPlaying}
          onClick={() => {
            setIsPlaying(!isPlaying)
          }}
          p={0}
        >
          <Icon as={FaPlay} h={5} w={5} />
        </Button>
        <Button
          colorScheme="blackAlpha"
          disabled={!isPlaying}
          isLoading={isLoading}
          onClick={() => {
            setIsPlaying(false)
          }}
        >
          <Icon as={FaPause} h={5} w={5} />
        </Button>
        <Button
          colorScheme="blackAlpha"
          disabled={playlist.length === currentSong + 1}
          onClick={nextSong}
          isLoading={isLoading}
        >
          <Icon as={FaForward} h={5} w={5} />
        </Button>
      </HStack>
    </VStack>
  )
}

export default VideoPlayer
