import React, { ReactElement, useState } from "react";
import {
  Box,
  Wrap,
  Icon,
  Heading,
  Text,
  Image,
  Stack,
  Button,
} from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiCog } from "react-icons/hi";
import { ISong, useRoomData } from "../../utils";

interface Props {
  songData: ISong;
  isDragging: () => boolean;
  showModal: () => void;
}

function SongBox({ songData, isDragging, showModal }: Props): ReactElement {
  const { songTitle, thumbnail } = songData;
  const [isFav, setIsFav] = useState(false);
  const { setSelected } = useRoomData();

  const favSong = () => {
    setIsFav(!isFav);
  };

  const handleShowModal = () => {
    setSelected(songData);
    showModal();
  };

  return (
    <Box
      border="1px"
      borderRadius="md"
      p="2"
      // h="7rem"
      w="30rem"
      bg={isDragging ? "#EBF8FF" : "#F7FAFC"}
      alignItems="center"
    >
      <Wrap spacing="10px" align="center">
        <Box w="15%" h="100%" align="center">
          <Image
            boxSize="70px"
            borderRadius="lg"
            objectFit="cover"
            src={thumbnail ? thumbnail : "https://picsum.photos/50/50/?blur"}
            alt="Dan Abramov"
          />
        </Box>
        <Stack w="70%">
          <Heading size="xs" w="70%">
            {songTitle}
          </Heading>
          <Box h="2px" w="100%" bg="blackAlpha.400" margin="5px auto" />
          <Box textAlign="center" w="100%">
            <Text fontSize="sm">Singer: {songData.singer}</Text>
          </Box>
        </Stack>
        <Box h="100%" align="center" w="5%">
          <Button variant="ghost" marginBottom="5px" onClick={handleShowModal}>
            <Icon as={HiCog} h={4} w={4} />
          </Button>
          <Button variant="ghost" onClick={favSong}>
            <Icon as={isFav ? FaHeart : FaRegHeart} />
          </Button>
        </Box>
      </Wrap>
    </Box>
  );
}

export default SongBox;
