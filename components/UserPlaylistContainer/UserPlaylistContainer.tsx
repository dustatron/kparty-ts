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
import { useFirestoreAction } from "../../utils";
import React, { useEffect, useState } from "react";
import SongSearch from "../SongSearch";
import useRoomData from "../../utils/hooks/useRoomData";
import { getDurationSongList } from "../../utils/getDuration";

export const UserPlaylistContainer = () => {
  const { playlist, currentSong, roomId, remainingSongs } = useRoomData(
    ({ roomData: { playlist, currentSong }, roomKey, remainingSongs }) => ({
      playlist,
      currentSong,
      roomId: roomKey,
      remainingSongs,
    })
  );

  const { resetRoom } = useFirestoreAction(roomId);

  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
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
            <Playlist handleTabsChange={handleTabsChange} tabIndex={tabIndex} />
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
          <SongSearch changeTab={handleTabsChange} />
        </TabPanel>
        <TabPanel p={{ base: "2", sm: "2", md: "4" }}>
          <Favorites handleTabsChange={handleTabsChange} tabIndex={tabIndex} />
        </TabPanel>
        <TabPanel p={{ base: "2", sm: "2", md: "4" }}>
          <Controls />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserPlaylistContainer;
