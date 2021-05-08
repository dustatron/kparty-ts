import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { VStack, HStack, Button, Center, Spinner } from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TriangleUpIcon,
  NotAllowedIcon,
} from "@chakra-ui/icons";
import { Rooms } from "../../utils";

const player = ({ setTitle }) => {
  const router = useRouter();
  const { roomId } = router.query;
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    setRoomData(Rooms.find((room) => room.id === roomId));
  }, [roomId]);

  useEffect(() => {
    if (roomData) {
      setTitle(roomData.title);
    }
  }, [roomData]);

  return (
    <VStack spacing={0} align="stretch">
      <Center bg="#4A4A4A" p="2">
        {roomData && roomData?.playlist[roomData.currentSong]?.link && (
          <ReactPlayer url={roomData.playlist[roomData.currentSong]?.link} />
        )}
        {!roomData?.playlist[roomData.currentSong]?.link && <Spinner />}
      </Center>
      <HStack bg="#333" p="2" justify="center">
        <Button colorScheme="blackAlpha">
          <ArrowLeftIcon w={5} h={5} />
        </Button>
        <Button colorScheme="blackAlpha">
          <TriangleUpIcon h={5} w={5} transform="rotate(90deg)" />
        </Button>
        <Button colorScheme="blackAlpha">
          <NotAllowedIcon h={5} w={5} />
        </Button>
        <Button colorScheme="blackAlpha">
          <ArrowRightIcon w={5} h={5} />
        </Button>
      </HStack>
    </VStack>
  );
};

export default player;
