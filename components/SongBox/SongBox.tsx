import React, { ReactElement } from "react";
import { Box, Divider } from "@chakra-ui/react";
import { ISong } from "../../utils";

interface Props {
  songData: ISong;
}

function SongBox({ songData }: Props): ReactElement {
  const { songTitle } = songData;
  return (
    <Box border="1px" borderRadius="md" p="2" h="6rem" w="100%">
      {songTitle}
    </Box>
  );
}

export default SongBox;
