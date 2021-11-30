import { VStack } from "@chakra-ui/react"
import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ISong, useFirestoreAction } from "../../utils"
import SongBox from "../SongBox"
import styles from "./styles.module.css"

interface Props {
  songList: any[]
  currentSong: number
  playlist: ISong[]
  roomId: string
  setSongList: (songList: ISong[]) => void
  handleTabsChange: (index: number) => void
  showModal: () => void
  tabIndex: number
  isFav: (song: ISong) => boolean
  isActive: boolean
}

export const Playlist = ({
  songList,
  currentSong,
  playlist,
  roomId,
  setSongList,
  handleTabsChange,
  showModal,
  tabIndex,
  isFav,
  isActive,
}: Props) => {
  const { playlistUpdate, nextSong, prevSong, resetRoom } =
    useFirestoreAction(roomId)
  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result: ISong[] = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }
  const onDragEnd = (result) => {
    if (!result.destination) return

    const reorderedList = reorder(
      songList,
      result.source.index,
      result.destination.index
    )
    const startOfList = playlist.slice(0, currentSong)
    const updatedList =
      currentSong === 0 ? reorderedList : [...startOfList, ...reorderedList]

    playlistUpdate(updatedList)
    setSongList(reorderedList)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <VStack
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
  )
}
