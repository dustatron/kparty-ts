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
import { FaRegHeart, FaHeart, FaGalacticSenate } from "react-icons/fa";
import { useRouter } from "next/router";
import { HiCog } from "react-icons/hi";
import { ISong, useRoomData, useAuth, useFirestoreAction } from "../../utils";
import { SiAddthis } from "react-icons/si";

interface Props {
  songData: ISong;
  isDragging?: () => boolean;
  showModal: () => void;
  fromFavorites?: boolean;
  changeTab: (index: number) => void;
}

function SongBox({
  songData,
  isDragging,
  showModal,
  fromFavorites,
  changeTab,
}: Props): ReactElement {
  const router = useRouter();
  const { roomId } = router.query;

  const { songTitle, thumbnail } = songData;
  const [isFav, setIsFav] = useState(fromFavorites);
  const { setSelected } = useRoomData();
  const { addFavSong, addSong } = useFirestoreAction();
  const { currentUser } = useAuth();

  const favSong = () => {
    setIsFav(!isFav);
    if (!isFav) {
      addFavSong(songData, currentUser);
      changeTab(2);
    }
  };

  const handleShowModal = () => {
    setSelected(songData);
    showModal();
  };

  const handleAdd = () => {
    addSong(songData, roomId);
    changeTab(0);
  };

  return (
    <Box
      border="1px"
      borderRadius="md"
      p="2"
      // w="22rem"
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
        <Stack w="20rem">
          <Heading size="xs" w="100%">
            {songTitle}
          </Heading>
          <Box h="2px" w="100%" bg="blackAlpha.400" margin="5px auto" />
          <Box textAlign="center" w="100%">
            <Text fontSize="sm">Singer: {songData.singer}</Text>
          </Box>
        </Stack>
        <Box h="100%" align="center" w="5%">
          {fromFavorites && (
            <Button onClick={handleAdd}>
              <Icon as={SiAddthis} />
            </Button>
          )}
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
