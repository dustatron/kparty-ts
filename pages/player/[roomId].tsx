import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";
import { Rooms } from "../../utils";
import type { IRoom } from "../../utils";
import VideoPlayer from "../../components/VideoPlayer";
import VideoPlaylist from "../../components/VideoPlayList";
import WithAuth from "../../components/WithAuth";

interface Props {
  setTitle: Function;
}

const player: React.FC<Props> = ({ setTitle }) => {
  const router = useRouter();
  const { roomId } = router.query;
  const [roomData, setRoomData] = useState<IRoom>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setRoomData(Rooms.find((room) => room.id === roomId));
  }, [roomId]);

  useEffect(() => {
    if (roomData && isPlaying) {
      const songTitle = roomData.playlist[roomData.currentSong].songTitle;
      setTitle(`playing ${songTitle}`);
    }
    if (roomData && !isPlaying) {
      setTitle(roomData.title);
    }
  }, [roomData, isPlaying]);

  const nextSong = () => {
    const newState = { ...roomData, currentSong: roomData.currentSong + 1 };
    setRoomData(newState);
  };

  const previousSong = () => {
    const newState = { ...roomData, currentSong: roomData.currentSong - 1 };
    setRoomData(newState);
  };

  return (
    <>
      {roomData && (
        <>
          <VideoPlayer
            roomData={roomData}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            nextSong={nextSong}
            previousSong={previousSong}
          />
          <VideoPlaylist
            playlist={roomData.playlist}
            currentSong={roomData.currentSong}
            isPlaying={isPlaying}
          />
        </>
      )}
    </>
  );
};

export default WithAuth(player);
