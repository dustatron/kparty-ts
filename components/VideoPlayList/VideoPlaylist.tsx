import React, { ReactElement, useState, useEffect } from "react";
import { Heading, Stack, Wrap, Text, Divider } from "@chakra-ui/react";
import { ISong } from "../../utils";

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
      <Wrap p="5" justify="center">
        {upcomingSongs.map((song: ISong, index) => (
          <Stack
            borderRadius="lg"
            border="1px"
            p="3"
            w="25rem"
            h="7rem"
            bg={
              isPlaying &&
              playlist[currentSong].songId === song.songId &&
              "#C6F6D5"
            }
          >
            <Heading size="sm">
              {song.songId} | {song.songTitle}
            </Heading>
            <Divider p="1" />
            <Text>{song.singer}</Text>
          </Stack>
        ))}
      </Wrap>
    </>
  );
}

export default VideoPlaylist;
