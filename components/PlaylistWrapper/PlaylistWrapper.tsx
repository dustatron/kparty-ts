import React, { FC, useEffect } from "react";
import { Skeleton, Stack } from "@chakra-ui/react";
import useRoomData from "../../utils/hooks/useRoomData";

import { Container } from "@chakra-ui/react";
import UserPlaylistContainer from "../UserPlaylistContainer";

interface Props {
  setTitle: (title: string) => void;
  roomId: string;
}

const playlistWrapper: FC<Props> = ({ setTitle }) => {
  const [roomData] = useRoomData((state) => [state?.roomData]);

  useEffect(() => {
    if (roomData) {
      setTitle(`${roomData.title} Playlist`);
    }
  }, [roomData]);

  return (
    <Container centerContent p={{ base: "0", sm: "0", md: "5" }}>
      {roomData && <UserPlaylistContainer />}
      {!roomData && (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
    </Container>
  );
};

export default playlistWrapper;
