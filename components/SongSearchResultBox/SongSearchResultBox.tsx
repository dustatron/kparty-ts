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
  ISong,
  IUser,
  IVideoData,
  useFirestoreAction,
  videoToSong,
} from "../../utils";

import React from "react";
import { SiAddthis } from "react-icons/si";
import { useState } from "react";
import PreviewButton from "../ModalButtons/PreviewButton";
import PreviewTitle from "../ModalButtons/PreviewTitle";
import useRoomData from "../../utils/hooks/useRoomData";

interface Props {
  videoData: IVideoData;
  authorId: string;
  user: IUser;
  roomId: string;
  changeTab: (index: number) => void;
  clear: () => void;
}

const SongSearchResultBox = ({
  videoData,
  roomId,
  user,
  changeTab,
  clear,
}: Props) => {
  const isKJ = useRoomData((state) => state.isKJ);
  const [isShowingUserInput, setIsShowingCustomUser] = useState(false);
  const [customUserName, setCustomUserName] = useState("");
  const { addSong } = useFirestoreAction(roomId);
  const thumbnail = `https://i.ytimg.com/vi/${videoData.id}/default.jpg`;

  const handleAdd = () => {
    if (isKJ) {
      setIsShowingCustomUser(true);
    } else {
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
    addSong(videoData, customUser);
    changeTab(0);
    clear();
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
          <PreviewTitle handleAdd={handleAdd} video={videoData} />
        )}

        <VStack w="10%" justifyContent="space-between">
          <PreviewButton handleAdd={handleAdd} video={videoData} />

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
