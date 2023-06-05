import { Box, Button, VStack } from "@chakra-ui/react";
import { FaBackward, FaForward } from "react-icons/fa";
import { GrPause } from "react-icons/gr";

import React from "react";
import DeleteButton from "./DeleteButton";

interface Props {
  getDuration: () => string;
  handleNextSong: () => void;
  isNextDisabled: boolean;
  handlePreviousSong: () => void;
  isPrevDisabled: boolean;
  resetRoom: () => void;
  deletePlaylist: () => void;
  handlePause: () => void;
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
  const totalDuration = getDuration();
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

      {/* <Button
        leftIcon={<GrPause />}
        onClick={handlePreviousSong}
        disabled={isPrevDisabled}
        size="lg"
        w="90%"
      >
        Pause
      </Button> */}

      <Button
        onClick={resetRoom}
        size="lg"
        w="90%"
        variant="outline"
        colorScheme="telegram"
      >
        Restart
      </Button>
      <DeleteButton deletePlaylist={deletePlaylist} />
    </VStack>
  );
};
