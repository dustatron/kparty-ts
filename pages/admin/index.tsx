import {
  Box,
  Container,
  Heading,
  Select,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { IRoom, useAuth } from "../../utils";
import React, { ChangeEvent, useState } from "react";
import { Playlist } from "../../components/UserPlaylistContainer";
import WithAuth from "../../components/WithAuth";
import useRoomData from "../../utils/hooks/useRoomData";
import AdminControls from "../../components/AdminControls";

interface Props {
  roomsList?: IRoom[];
  setTitle: (title: string) => void;
}

const index = ({ roomsList, setTitle }: Props) => {
  setTitle("KJ View");
  const { currentUser } = useAuth();
  const [setRoomKey, clearRoomData, roomData] = useRoomData((state) => [
    state.setRoomKey,
    state.clearRoomData,
    state.roomData,
  ]);

  const [selectedRoom, setSelectedRoom] = useState<string>();

  const selectRoom = (e: ChangeEvent<HTMLSelectElement>) => {
    const room = roomsList.find((room) => room.id === e.target.value);

    setSelectedRoom(room?.id);
    clearRoomData();
    setRoomKey(e.target.value);
  };

  const isFav = (song) => {
    if (currentUser) {
      const hasSong = currentUser.favorites?.find(
        (favSong) => favSong.songId === song.songId
      );
      return hasSong;
    }
    return false;
  };

  return (
    <Container maxW="container.2xl" centerContent p="5">
      <Stack direction="row">
        <Heading>KJ Dashboard</Heading>
        <Box>
          {!roomsList && <Skeleton height="40px" />}
          {roomsList && (
            <Select
              value={selectedRoom}
              placeholder="select a room"
              onChange={selectRoom}
            >
              {roomsList?.map((room) => (
                <option value={room.id}>{room.title}</option>
              ))}
            </Select>
          )}
        </Box>
      </Stack>

      <Stack
        direction={{ base: "column-reverse", md: "row" }}
        w="100%"
        spacing="2"
      >
        <Box
          w={{ base: "100%", md: "50%" }}
          h={{ base: "auto", md: "80vh" }}
          pb={{ base: "2", md: "0" }}
          overflow="scroll"
        >
          {roomData && (
            <Playlist handleTabsChange={() => {}} isFav={isFav} tabIndex={0} />
          )}
        </Box>
        <Box w={{ base: "100%", md: "50%" }}>
          {selectedRoom && (
            <AdminControls roomId={selectedRoom} currentUser={currentUser} />
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default WithAuth(index);
