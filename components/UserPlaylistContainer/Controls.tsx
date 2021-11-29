import React from "react"
import { Box, Button, VStack } from "@chakra-ui/react"
import { FaForward, FaBackward } from "react-icons/fa"

interface Props {
  getDuration: () => string
  handleNextSong: () => void
  isNextDisabled: boolean
  handlePreviousSong: () => void
  isPrevDisabled: boolean
  resetRoom: () => void
  deletePlaylist: () => void
}

export const Controls = ({
  getDuration,
  handleNextSong,
  isNextDisabled,
  handlePreviousSong,
  isPrevDisabled,
  resetRoom,
  deletePlaylist,
}: Props) => {
  const totalDuration = getDuration()
  return (
    <VStack>
      <Box
        padding="2"
        border="1px"
        borderRadius="sm"
        w="90%"
        textAlign="center"
      >
        Duration: {totalDuration}
      </Box>
      <Button
        leftIcon={<FaForward />}
        onClick={handleNextSong}
        disabled={isNextDisabled}
        size="lg"
        w="90%"
      >
        Next
      </Button>
      <Button
        leftIcon={<FaBackward />}
        onClick={handlePreviousSong}
        disabled={isPrevDisabled}
        size="lg"
        w="90%"
      >
        Previous
      </Button>
      <Button onClick={resetRoom} size="lg" w="90%">
        Restart
      </Button>
      <Button onClick={deletePlaylist} size="lg" w="90%">
        Delete All Songs
      </Button>
    </VStack>
  )
}
