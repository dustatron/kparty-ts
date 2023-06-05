import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import VideoPlayer from "../../components/VideoPlayer";
import WithAuth from "../../components/WithAuth";
import { useRoomData, useFirestoreAction } from "../../utils";
import PlayerTag from "../../components/PlayerTag";
interface Props {
  setTitle: Function;
}

const player: React.FC<Props> = ({ setTitle }) => {
  const router = useRouter();
  const { roomId } = router.query;

  const { roomData, setRoomKey } = useRoomData();
  const { nextSong, prevSong, isLoading, setIsActive } = useFirestoreAction(
    roomId as string
  );
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setRoomKey(roomId);

    return () => {
      setRoomKey(null);
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
          <PlayerTag roomId={roomData.id} />
        </>
      )}
    </>
  );
};

export default WithAuth(player);
