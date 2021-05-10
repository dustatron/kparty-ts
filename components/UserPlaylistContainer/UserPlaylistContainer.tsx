import React from "react";
import { ISong } from "../../utils";
import {
  Stack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import SongBox from "../../components/SongBox";

interface Props {
  playlist: ISong[];
}

export const UserPlaylistContainer = ({ playlist }: Props) => {
  return (
    <>
      <Tabs variant="enclosed" isFitted w="100%">
        <TabList>
          <Tab>Playlist</Tab>
          <Tab>Search</Tab>
          <Tab>Favorites</Tab>
          <Tab>Room Details</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack align="center">
              {playlist?.map((song: ISong) => (
                <SongBox songData={song} />
              ))}
            </Stack>
          </TabPanel>
          <TabPanel>Search stuff here</TabPanel>
          <TabPanel>Favorites</TabPanel>
          <TabPanel>Room Details here</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default UserPlaylistContainer;
