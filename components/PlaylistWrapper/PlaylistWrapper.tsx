import React, { FC, useEffect, useState } from "react";
import { Skeleton, Stack } from "@chakra-ui/react";
import { useFirestoreAction, useRoomData } from "../../utils";

import { Container } from "@chakra-ui/react";
import FavSongModal from "../FavSongModal";
import SongEditModal from "../SongEditModal";
import UserPlaylistContainer from "../UserPlaylistContainer";
import VideoPreviewModal from "../VideoPreviewModal";

interface Props {
  setTitle: (title: string) => void;
  roomId: string | string[];
  isKJ?: boolean;
}

const playlistWrapper: FC<Props> = ({ setTitle, roomId, isKJ }) => {
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);
  const [isFavModalShowing, setIsFavModalShowing] = useState<boolean>(false);
  const [isPreviewModalShowing, setIsPreviewModalShowing] =
    useState<boolean>(false);
  const [previewData, setPreviewData] = useState({
    title: "",
    link: "",
  });
  const { roomData, setRoomKey } = useRoomData();

  useEffect(() => {
    setRoomKey(roomId);

    return () => {
      setRoomKey(null);
    };
  }, [roomId]);

  useEffect(() => {
    if (roomData) {
      setTitle(`${roomData.title} Playlist`);
    }
  }, [roomData]);

  const handleShowModal = (hide?: boolean) => {
    if (hide) {
      setIsModalShowing(false);
    } else {
      setIsModalShowing(true);
    }
  };
  const handleShowFavModal = () => {
    setIsFavModalShowing(true);
  };

  const handleShowPreview = (link, title) => {
    setPreviewData({ link, title });
    setIsPreviewModalShowing(true);
  };

  const handleHideFavModal = () => {
    setIsFavModalShowing(false);
  };

  const handleHidePreviewModal = () => {
    setIsPreviewModalShowing(false);
  };

  return (
    <Container centerContent p={{ base: "0", sm: "0", md: "5" }}>
      {roomData && (
        <UserPlaylistContainer
          playlist={roomData.playlist}
          showModal={handleShowModal}
          showFavModal={handleShowFavModal}
          roomId={roomId}
          currentSong={roomData.currentSong}
          isActive={roomData.isActive}
          handleShowPreview={handleShowPreview}
          isKJ={isKJ}
        />
      )}
      {!roomData && (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
      <SongEditModal
        hideModal={() => handleShowModal(true)}
        isModalShowing={isModalShowing}
        roomId={roomId}
      />
      <FavSongModal
        hideFavModal={handleHideFavModal}
        isFavModalShowing={isFavModalShowing}
      />
      <VideoPreviewModal
        previewData={previewData}
        isShowing={isPreviewModalShowing}
        hideModal={handleHidePreviewModal}
      />
    </Container>
  );
};

export default playlistWrapper;
