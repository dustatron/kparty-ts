import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useFirestoreAction } from "../../utils";
import React, { useEffect, useState } from "react";
import { Controls, Favorites } from "../../components/UserPlaylistContainer";
import useRoomData from "../../utils/hooks/useRoomData";
import SongSearch from "../../components/SongSearch";
import { getDurationSongList } from "../../utils/getDuration";

type Props = { roomId: string; currentUser: any };

function AdminControls({ roomId, currentUser }: Props) {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const [remainingSongs, roomData] = useRoomData((state) => [
    state.remainingSongs,
    state.roomData,
  ]);
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
        <Tab>➕ Add</Tab>
        <Tab>Controls</Tab>
        <Tab>Favorites</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p={{ base: "0", sm: "0", md: "4" }}>
          <SongSearch changeTab={() => {}} />
        </TabPanel>
        <TabPanel p={{ base: "0", sm: "0", md: "4" }}>
          {roomData && <Controls />}
        </TabPanel>
        <TabPanel p={{ base: "0", sm: "0", md: "4" }}>
          <Favorites handleTabsChange={handleTabsChange} tabIndex={tabIndex} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default AdminControls;
