import { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";
import UserPlaylistContainer from "../../components/UserPlaylistContainer";
import { Rooms, IRoom } from "../../utils";
import { Container } from "@chakra-ui/react";

interface Props {
  setTitle: (title: string) => void;
}

const playlist: FC<Props> = ({ setTitle }) => {
  const router = useRouter();
  const { roomId } = router.query;
  const [roomData, setRoomData] = useState<IRoom>(null);

  useEffect(() => {
    setRoomData(Rooms.find((room) => room.id === roomId));
  }, [roomId]);

  useEffect(() => {
    if (roomData) {
      setTitle(`${roomData.title} Room`);
    }
  }, [roomData]);

  return (
    <Container maxW="xl" centerContent p="5">
      {roomData && <UserPlaylistContainer playlist={roomData.playlist} />}
    </Container>
  );
};

export default playlist;
