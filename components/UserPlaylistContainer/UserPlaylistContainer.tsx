import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
import playlist from "../../pages/playlist/[roomId]";

interface Props {
  playlist: ISong[];
  showModal: (songId: string) => void;
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const UserPlaylistContainer = ({ playlist, showModal }: Props) => {
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    if (playlist) {
      setSongList(playlist);
    }
  }, [playlist]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    // const { source, destination } = result;

    const reorderedList = reorder(
      songList,
      result.source.index,
      result.destination.index
    );
    setSongList(reorderedList);
  };

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
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <Stack
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    align="center"
                  >
                    {songList.map((song: ISong, index) => (
                      <Draggable
                        key={song.songId}
                        draggableId={song.songId}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SongBox
                              songData={song}
                              isDragging={snapshot.isDragging}
                              showModal={() => showModal(song.songId)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </DragDropContext>
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
