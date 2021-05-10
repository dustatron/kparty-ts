import React, { ReactElement } from "react";
import { Box, Divider } from "@chakra-ui/react";
import { ISong } from "../../utils";

interface Props {
  songData: ISong;
  isDragging: () => boolean;
}

function SongBox({ songData, isDragging }: Props): ReactElement {
  const { songTitle } = songData;
  return (
    <Box
      border="1px"
      borderRadius="md"
      p="2"
      h="6rem"
      w="30rem"
      bg={isDragging ? "red" : "unset"}
    >
      {songTitle}
    </Box>
  );
}

export default SongBox;
