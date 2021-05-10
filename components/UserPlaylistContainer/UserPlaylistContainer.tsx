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
    <div>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Playlist</Tab>
          <Tab>Search</Tab>
          <Tab>Favorites</Tab>
          <Tab>Room Details</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack>
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
    </div>
  );
};

export default UserPlaylistContainer;
