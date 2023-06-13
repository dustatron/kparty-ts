import {
  Box,
  Button,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Controls, Favorites, Playlist } from "./";
import {
  ISong,
  IVideoData,
  secondsToHours,
  useAuth,
  useFirestoreAction,
} from "../../utils";
import React, { useEffect, useState } from "react";
import SongSearch from "../SongSearch";
import useRoomData from "../../utils/hooks/useRoomData";
import { getDurationSongList } from "../../utils/getDuration";

interface Props {
  isKJ?: boolean;
}

export const UserPlaylistContainer = ({ isKJ }: Props) => {
  const { playlist, currentSong, roomId, remainingSongs } = useRoomData(
    ({ roomData: { playlist, currentSong }, roomKey, remainingSongs }) => ({
      playlist,
      currentSong,
      roomId: roomKey,
      remainingSongs,
    })
  );

  const {
    nextSong,
    prevSong,
    resetRoom,
    createPlaylist,
    deletePlaylist,
    setIsActive,
  } = useFirestoreAction(roomId);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isNextDisabled, setNextDisabled] = useState<boolean>(false);
  const [isPrevDisabled, setPrevDisabled] = useState<boolean>(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!playlist || playlist.length === 0) {
      createPlaylist();
    }
    //Next Btn
    if (playlist?.length <= currentSong) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
    //Prev Btn
    if (currentSong <= 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [playlist, currentSong]);

  const handlePause = () => {
    setIsActive(roomId, false);
  };

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const handleNextSong = () => {
    nextSong(roomId);
  };

  const handlePreviousSong = () => {
    if (currentSong > 0) {
      prevSong(roomId);
    }
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
    <>
      <Tabs
        variant="line"
        isFitted
        w="100%"
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>Playlist</Tab>
          <Tab>➕ Add</Tab>
          <Tab>Favorites</Tab>
          <Tab>Controls</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={{ base: "2", sm: "2", md: "4" }}>
            {playlist && (
              <Playlist
                handleTabsChange={handleTabsChange}
                isFav={isFav}
                tabIndex={tabIndex}
              />
            )}

            {playlist?.length === 0 && (
              <Center>
                <Text as="h3" fontSize="2xl">
                  Playlist is empty
                </Text>
              </Center>
            )}
            {playlist?.length !== 0 && playlist?.length <= currentSong && (
              <Box w="100" textAlign="center">
                <Button onClick={() => resetRoom()} size="lg" variant="outline">
                  Restart
                </Button>
              </Box>
            )}
          </TabPanel>
          <TabPanel p={{ base: "0", sm: "0", md: "4" }}>
            <SongSearch
              changeTab={handleTabsChange}
              roomId={roomId}
              isKJ={isKJ}
            />
          </TabPanel>
          <TabPanel p={{ base: "2", sm: "2", md: "4" }}>
            <Favorites
              favorites={currentUser.favorites}
              handleTabsChange={handleTabsChange}
              tabIndex={tabIndex}
              roomId={roomId}
            />
          </TabPanel>
          <TabPanel p={{ base: "2", sm: "2", md: "4" }}>
            <Controls getDuration={() => getDurationSongList(remainingSongs)} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default UserPlaylistContainer;
