import {
  Box,
  Button,
  Heading,
  Icon,
  Image,
  Link,
  Spacer,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ISong, useAuth, useFirestoreAction } from "../../utils";
import React, { ReactElement, useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import EditSongButton from "../ModalButtons/EditSongButton";
import useRoomData from "../../utils/hooks/useRoomData";

interface Props {
  songData: ISong;
  isDragging?: () => boolean;
  fromFavorites?: boolean;
  changeTab?: (index: number) => void;
  currentTab?: number;
  isActive?: boolean;
  isPlayer?: boolean;
  isFavView?: boolean;
}

function SongBox({
  songData,
  isDragging,
  fromFavorites,
  changeTab,
  currentTab,
  isActive,
  isPlayer,
  isFavView,
}: Props): ReactElement {
  const { songTitle, thumbnail } = songData;
  const [isFav, setIsFav] = useState(fromFavorites);
  const roomId = useRoomData((state) => state.roomKey);
  const { addFavSong, addSong, removeFavorite } = useFirestoreAction(
    roomId as string
  );
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
    if (isPlayer) {
      return window.open(songData.link, "_blank");
    }
  };

  const handleAdd = () => {
    addSong(songData, currentUser);
    changeTab(0);
  };

  return (
    <Stack
      direction="row"
      border="1px"
      borderRadius="sm"
      w="100%"
      borderColor="gray.300"
      p="1"
      bg={isDragging || isActive ? "#b3e1f9" : "#F7FAFC"}
      justifyContent="space-between"
      alignItems="center"
      boxShadow="lg"
    >
      <Image
        w="30%"
        h="100%"
        boxSize="9rem"
        objectFit="fill"
        src={thumbnail ? thumbnail : "https://picsum.photos/50/50/?blur"}
      />

      <Stack w="50%" h="100%">
        <Heading size="xs" w="100%" onClick={handleShowModal}>
          <Link>{songTitle}</Link>
        </Heading>
        <Box h="2px" w="100%" bg="blackAlpha.400" margin="5px auto" />
        <Box textAlign="center" w="100%">
          <Wrap>
            {songData.userPhoto && (
              <Image
                src={songData.userPhoto}
                w="2rem"
                h="2rem"
                borderRadius="3xl"
              />
            )}
            <strong> Singer: </strong>
            <Text fontSize="sm"> {songData.singer?.slice(0, 12)}</Text>
            <Spacer />
          </Wrap>
        </Box>
      </Stack>

      <VStack h="100%" align="center">
        {fromFavorites && currentTab !== 0 && (
          <Button onClick={handleAdd}>
            <Icon as={SiAddthis} />
          </Button>
        )}
        {!isPlayer && !isFavView && <EditSongButton songData={songData} />}
        {isPlayer && (
          <Button variant="ghost" marginBottom="5px" onClick={handleShowModal}>
            <Icon as={MdOpenInNew} h={6} w={6} />
          </Button>
        )}
        <Button variant="ghost" onClick={favSong}>
          <Icon as={isFav ? FaHeart : FaRegHeart} h="5" w="5" />
        </Button>
      </VStack>
    </Stack>
  );
}

export default SongBox;
