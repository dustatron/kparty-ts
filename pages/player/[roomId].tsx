import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import VideoPlayer from "../../components/VideoPlayer";
import WithAuth from "../../components/WithAuth";
import { useFirestoreAction } from "../../utils";
import PlayerTag from "../../components/PlayerTag";
import useRoomData from "../../utils/hooks/useRoomData";
interface Props {
  setTitle: Function;
}

const player: React.FC<Props> = ({ setTitle }) => {
  const router = useRouter();
  const { roomId } = router.query;

  const { roomData, setRoomKey } = useRoomData((state) => ({
    roomData: state.roomData,
    setRoomKey: state.setRoomKey,
  }));
  const { nextSong, prevSong, isLoading, setIsActive } =
    useFirestoreAction(roomId);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setRoomKey(roomId);

    return () => {
      setRoomKey();
    };
  }, []);

  useEffect(() => {
    if (roomData && isPlaying) {
      const songTitle = roomData.playlist[roomData.currentSong]?.songTitle;
      setTitle(`playing ${songTitle}`);
    }
    if (roomData && !isPlaying) {
      setTitle(roomData.title);
    }
    setIsActive(roomId, isPlaying);
  }, [roomData, isPlaying]);

  return (
    <>
      {roomData && (
        <>
          <VideoPlayer
            roomData={roomData}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            nextSong={() => {
              nextSong(roomId);
            }}
            previousSong={() => {
              prevSong(roomId);
            }}
            isLoading={isLoading}
          />
          <PlayerTag />
        </>
      )}
    </>
  );
};

export default WithAuth(player);
