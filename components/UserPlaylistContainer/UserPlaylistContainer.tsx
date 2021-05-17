import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ISong, useFirestoreAction } from "../../utils";
import { FaForward, FaBackward } from "react-icons/fa";
import {
  Stack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Container,
  Button,
  VStack,
} from "@chakra-ui/react";
import SongBox from "../../components/SongBox";
import SongSearch from "../SongSearch";
interface Props {
  showModal: (songId: string) => void;
  playlist: ISong[];
  roomId: any;
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result: ISong[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const UserPlaylistContainer = ({
  showModal,
  playlist,
  roomId,
}: Props) => {
  const { playlistUpdate, nextSong, prevSong } = useFirestoreAction();
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
    playlistUpdate(roomId, reorderedList);
    setSongList(reorderedList);
  };

  return (
    <>
      <Tabs variant="enclosed" isFitted w="100%">
        <TabList>
          <Tab>Playlist</Tab>
          <Tab>Search</Tab>
          {/* <Tab>Favorites</Tab> */}
          <Tab>Controls</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Container>
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
            </Container>
          </TabPanel>
          <TabPanel>
            <SongSearch />
          </TabPanel>
          {/* <TabPanel>Favorites</TabPanel> */}
          <TabPanel>
            <VStack>
              <Button
                leftIcon={<FaForward />}
                onClick={() => nextSong(roomId)}
                size="lg"
                w="90%"
              >
                Next{" "}
              </Button>
              <Button
                leftIcon={<FaBackward />}
                onClick={() => prevSong(roomId)}
                size="lg"
                w="90%"
              >
                Previous{" "}
              </Button>
              <Button size="lg" w="90%">
                Clear All Songs
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default UserPlaylistContainer;
