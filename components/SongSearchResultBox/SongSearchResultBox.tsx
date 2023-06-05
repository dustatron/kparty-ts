import {
  Box,
  Button,
  Heading,
  Icon,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { FaHeart, FaPlay } from "react-icons/fa";
import {
  IUser,
  IVideoData,
  useFirestoreAction,
  videoToSong,
} from "../../utils";

import React from "react";
import { SiAddthis } from "react-icons/si";
import { useState } from "react";

interface Props {
  videoData: IVideoData;
  authorId: string;
  user: IUser;
  roomId: string;
  changeTab: (index: number) => void;
  clear: () => void;
  handleShowPreview: (songData: IVideoData, handleAdd) => void;
  isKJ: boolean;
}

const SongSearchResultBox = ({
  videoData,
  roomId,
  user,
  changeTab,
  clear,
  handleShowPreview,
  isKJ,
}: Props) => {
  const [isShowingUserInput, setIsShowingCustomUser] = useState(false);
  const [customUserName, setCustomUserName] = useState("");
  const { title, artist, duration, id, publishedAt } = videoData;
  const { addSong } = useFirestoreAction(roomId);
  const thumbnail = `https://i.ytimg.com/vi/${id}/default.jpg`;
  const link = `https://www.youtube.com/watch?v=${id}`;

  const handleAdd = () => {
    if (isKJ) {
      setIsShowingCustomUser(true);
    } else {
      // const songNormalized = videoToSong(videoData, user);
      addSong(videoData, user);
      changeTab(0);
      clear();
    }
  };

  const handleAddCustomUserName = () => {
    const customUser: IUser = {
      displayName: customUserName,
      email: "",
      photoURL: "",
      uid: "custom-user",
    };
    // const songNormalized = videoToSong(videoData, customUser);
    addSong(videoData, customUser);
    changeTab(0);
    clear();
  };

  const getDuration = (seconds) => {
    const toMinutes = seconds / 60;
    const time = toMinutes.toFixed(2);
    return time.toString().replace(".", ":");
  };

  return (
    <Box
      p={{ sm: "1", md: "1" }}
      border="1px"
      borderRadius="sm"
      borderColor="gray.300"
      justifyContent="center"
      backgroundColor="white"
      boxShadow="md"
    >
      <Stack direction="row" justifyContent="space-between" p="2">
        <Box w="20%">
          <Image src={thumbnail} alt="thumbnail" borderRadius="lg" h="5rem" />
        </Box>
        {isShowingUserInput && (
          <Box w="60%">
            <Heading w="100%" textAlign="left" size="sm">
              Add User Name
            </Heading>
            <Input
              placeholder="User Name"
              value={customUserName}
              onChange={(e) => setCustomUserName(e.target.value)}
            />
          </Box>
        )}
        {!isShowingUserInput && (
          <Box
            w="60%"
            onClick={() => handleShowPreview(videoData, handleAdd)}
            cursor="pointer"
          >
            <Heading w="100%" textAlign="left" size="sm">
              {title}
            </Heading>
            <Text fontSize="xs"> artist: {artist} </Text>
            <Text fontSize="xs"> duration: {getDuration(duration)} </Text>
          </Box>
        )}

        <VStack w="10%" justifyContent="space-between">
          <Button
            variant="ghost"
            onClick={() => handleShowPreview(videoData, handleAdd)}
          >
            <Icon as={FaPlay} marginRight="5px" />
          </Button>
          {!isShowingUserInput && (
            <Button onClick={handleAdd} variant="ghost">
              <Icon as={SiAddthis} />
            </Button>
          )}
          {isShowingUserInput && (
            <Button
              colorScheme="green"
              onClick={handleAddCustomUserName}
              isDisabled={customUserName.length < 1}
            >
              Add
            </Button>
          )}
        </VStack>
      </Stack>
    </Box>
  );
};

export default SongSearchResultBox;
