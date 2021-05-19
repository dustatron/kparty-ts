import React, { ReactElement, useState, useEffect } from "react";
import { Wrap } from "@chakra-ui/react";
import { ISong } from "../../utils";
import SongBox from "../SongBox";

interface Props {
  playlist: ISong[];
  currentSong: number;
  isPlaying: boolean;
}

function VideoPlaylist({
  playlist,
  currentSong,
  isPlaying,
}: Props): ReactElement {
  const [upcomingSongs, setUpcomingSongs] = useState([]);

  useEffect(() => {
    setUpcomingSongs(playlist.slice(currentSong));
  }, [playlist, currentSong]);
  return (
    <>
      <Wrap p="2">
        {upcomingSongs.map((song: ISong, index) => (
          <div style={{ width: "30%" }}>
            <SongBox songData={song} isActive={index === 0} />
          </div>
        ))}
      </Wrap>
    </>
  );
}

export default VideoPlaylist;
