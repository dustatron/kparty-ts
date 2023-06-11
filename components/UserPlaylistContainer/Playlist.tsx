import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ISong, useFirestoreAction } from "../../utils";

import React from "react";
import SongBox from "../SongBox";
import { VStack } from "@chakra-ui/react";
import styles from "./styles.module.css";
import useRoomData from "../../utils/hooks/useRoomData";
import reorder from "../../utils/reorder";

interface Props {
  handleTabsChange: (index: number) => void;
  showModal: () => void;
  tabIndex: number;
  isFav: (song: ISong) => boolean;
}

export const Playlist = ({
  handleTabsChange,
  showModal,
  tabIndex,
  isFav,
}: Props) => {
  const [
    currentSong,
    isActive,
    remainingSongs,
    playlist,
    roomId,
    setRemainingSongs,
  ] = useRoomData(
    ({
      roomData: { currentSong, isActive },
      remainingSongs,
      playlist,
      roomKey,
      setRemainingSongs,
    }) => [
      currentSong,
      isActive,
      remainingSongs,
      playlist,
      roomKey,
      setRemainingSongs,
    ]
  );

  const { playlistUpdate } = useFirestoreAction(roomId);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const isSourceOrDestinationIndexZero =
      result.destination.index === 0 || result.source.index === 0;

    if (isActive && isSourceOrDestinationIndexZero) return;

    const reorderedList = reorder(
      remainingSongs,
      result.source.index,
      result.destination.index
    );

    const startOfList = playlist.slice(0, currentSong);
    const updatedList =
      currentSong === 0 ? reorderedList : [...startOfList, ...reorderedList];
    playlistUpdate(updatedList);
    setRemainingSongs(updatedList);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <VStack
            {...provided.droppableProps}
            ref={provided.innerRef}
            align="center"
            p="0"
          >
            {remainingSongs?.map((song: ISong, index) => (
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
                    className={styles.fit}
                  >
                    <SongBox
                      songData={song}
                      isDragging={snapshot.isDragging}
                      changeTab={handleTabsChange}
                      showModal={() => showModal()}
                      fromFavorites={isFav(song)}
                      currentTab={tabIndex}
                      isActive={isActive && index === 0}
                      roomId={roomId}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </DragDropContext>
  );
};
