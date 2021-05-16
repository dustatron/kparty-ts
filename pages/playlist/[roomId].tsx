import { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";
import UserPlaylistContainer from "../../components/UserPlaylistContainer";
import SongEditModal from "../../components/SongEditModal";
import { Container } from "@chakra-ui/react";
import WithAuth from "../../components/WithAuth";
import { useRoomData } from "../../utils";

interface Props {
  setTitle: (title: string) => void;
}

const playlist: FC<Props> = ({ setTitle }) => {
  const router = useRouter();
  const { roomId } = router.query;
  // const [roomData, setRoomData] = useState<IRoom>(null);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);
  const { roomData, setRoomKey } = useRoomData();

  useEffect(() => {
    setRoomKey(roomId);

    return () => {
      setRoomKey(null);
    };
  }, [roomId]);

  useEffect(() => {
    if (roomData) {
      setTitle(`${roomData.title} Room`);
    }
  }, [roomData]);

  const handleShowModal = (songId) => {
    console.log(songId);
    setIsModalShowing(true);
  };

  const handleHideModal = () => {
    setIsModalShowing(false);
  };

  return (
    <Container maxW="xl" centerContent p="5">
      {roomData && (
        <UserPlaylistContainer
          playlist={roomData.playlist}
          showModal={handleShowModal}
        />
      )}
      <SongEditModal
        hideModal={handleHideModal}
        isModalShowing={isModalShowing}
      />
    </Container>
  );
};

export default WithAuth(playlist);
