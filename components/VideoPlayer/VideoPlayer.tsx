import React, { FC } from "react";
import { FaPause, FaPlay, FaForward, FaBackward } from "react-icons/fa";
import { IRoom } from "../../utils";
import ReactPlayer from "react-player";
import { VStack, HStack, Button, Center, Icon } from "@chakra-ui/react";

type Props = {
  roomData: IRoom;
  isPlaying: boolean;
  setIsPlaying: (bool) => void;
  nextSong: () => void;
  previousSong: () => void;
};

const VideoPlayer: FC<Props> = ({
  roomData,
  isPlaying,
  setIsPlaying,
  nextSong,
  previousSong,
}) => {
  const { currentSong, playlist } = roomData;

  return (
    <VStack spacing={0} align="stretch">
      <Center bg="#4A4A4A" p="2">
        {playlist[currentSong]?.link && (
          <ReactPlayer
            controls
            playing={isPlaying}
            url={playlist[currentSong]?.link}
          />
        )}
      </Center>
      <HStack bg="#333" p="2" justify="center">
        <Button
          colorScheme="blackAlpha"
          onClick={previousSong}
          disabled={roomData?.currentSong === 0}
        >
          <Icon as={FaBackward} h={5} w={5} />
        </Button>
        <Button
          colorScheme="blackAlpha"
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
          p={0}
        >
          <Icon as={FaPlay} h={5} w={5} />
        </Button>
        <Button
          colorScheme="blackAlpha"
          disabled={!isPlaying}
          onClick={() => {
            setIsPlaying(false);
          }}
        >
          <Icon as={FaPause} h={5} w={5} />
        </Button>
        <Button
          colorScheme="blackAlpha"
          disabled={playlist.length === currentSong + 1}
          onClick={nextSong}
        >
          <Icon as={FaForward} h={5} w={5} />
        </Button>
      </HStack>
    </VStack>
  );
};

export default VideoPlayer;
