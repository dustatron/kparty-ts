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
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaHeart, FaGalacticSenate } from "react-icons/fa";
import { useRouter } from "next/router";
import { HiCog } from "react-icons/hi";
import { ISong, useRoomData, useAuth, useFirestoreAction } from "../../utils";
import { SiAddthis } from "react-icons/si";

interface Props {
  songData: ISong;
  isDragging?: () => boolean;
  showModal?: () => void;
  fromFavorites?: boolean;
  changeTab?: (index: number) => void;
  currentTab?: number;
  isActive?: boolean;
}

function SongBox({
  songData,
  isDragging,
  showModal,
  fromFavorites,
  changeTab,
  currentTab,
  isActive,
}: Props): ReactElement {
  const router = useRouter();
  const { roomId } = router.query;

  const { songTitle, thumbnail } = songData;
  const [isFav, setIsFav] = useState(fromFavorites);
  const { setSelected } = useRoomData();
  const { addFavSong, addSong, removeFavorite } = useFirestoreAction();
  const { currentUser } = useAuth();

  const favSong = () => {
    setIsFav(!isFav);
    if (!isFav) {
      addFavSong(songData, currentUser);
    }

    if (isFav) {
      removeFavorite(songData, currentUser);
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
    <Wrap
      spacing="10px"
      align="center"
      border="1px"
      borderRadius="md"
      w="100%"
      alignItems="center"
      p="2"
      justify="space-between"
      bg={isDragging || isActive ? "#b3e1f9" : "#F7FAFC"}
    >
      <Box align="center" w="20%">
        <Image
          boxSize="6rem"
          borderRadius="md"
          objectFit="cover"
          src={thumbnail ? thumbnail : "https://picsum.photos/50/50/?blur"}
          alt="Dan Abramov"
        />
      </Box>

      <Stack w="50%">
        <Heading size="xs" w="100%">
          {songTitle}
        </Heading>
        <Box h="2px" w="100%" bg="blackAlpha.400" margin="5px auto" />
        <Box textAlign="center" w="100%">
          <Wrap>
            <strong> Singer: </strong>
            <Text fontSize="sm"> {songData.singer}</Text>
            <Spacer />
            {songData.userPhoto && (
              <Image
                src={songData.userPhoto}
                w="2rem"
                h="2rem"
                borderRadius="3xl"
              />
            )}
          </Wrap>
        </Box>
      </Stack>

      <VStack h="100%" align="center">
        {fromFavorites && currentTab !== 0 && (
          <Button onClick={handleAdd}>
            <Icon as={SiAddthis} />
          </Button>
        )}
        {showModal && (
          <Button variant="ghost" marginBottom="5px" onClick={handleShowModal}>
            <Icon as={HiCog} h={4} w={4} />
          </Button>
        )}
        <Button variant="ghost" onClick={favSong}>
          <Icon as={isFav ? FaHeart : FaRegHeart} />
        </Button>
      </VStack>
    </Wrap>
  );
}

export default SongBox;
