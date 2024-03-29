import { Box, Button, VStack } from "@chakra-ui/react";
import { FaBackward, FaForward } from "react-icons/fa";
import { GrPause } from "react-icons/gr";

import React, { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import { useFirestoreAction } from "../../utils";
import useRoomData from "../../utils/hooks/useRoomData";
import { getDurationSongList } from "../../utils/getDuration";

interface Props {}

export const Controls = () => {
  const [isNextDisabled, setNextDisabled] = useState<boolean>(false);
  const [isPrevDisabled, setPrevDisabled] = useState<boolean>(false);
  const {
    roomData: { id: roomId, currentSong, playlist },
    remainingSongs,
  } = useRoomData((state) => state);

  const { resetRoom, setIsActive, nextSong, prevSong } = useFirestoreAction();
  const totalDuration = getDurationSongList(remainingSongs);

  const handleNextSong = () => {
    nextSong(roomId);
  };

  const handlePreviousSong = () => {
    if (currentSong > 0) {
      prevSong(roomId);
    }
  };

  useEffect(() => {
    //Next Btn
    if (playlist?.length <= currentSong) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
    //Prev Btn
    if (currentSong <= 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [playlist, currentSong]);

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
      <DeleteButton />
    </VStack>
  );
};
