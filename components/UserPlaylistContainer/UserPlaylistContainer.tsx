import React, { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ISong, useFirestoreAction, useAuth, secondsToHours } from "../../utils"
import { FaForward, FaBackward } from "react-icons/fa"
import {
  Box,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Container,
  Button,
  VStack,
} from "@chakra-ui/react"
import SongBox from "../../components/SongBox"
import SongSearch from "../SongSearch"
import styles from "./styles.module.css"

interface Props {
  showModal: () => void
  playlist: ISong[]
  roomId: any
  showFavModal: () => void
  currentSong: number
  isActive: boolean
  handleShowPreview: (link, title, handleSave) => void
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result: ISong[] = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const UserPlaylistContainer = ({
  showModal,
  playlist,
  roomId,
  showFavModal,
  currentSong,
  isActive,
  handleShowPreview,
}: Props) => {
  const { playlistUpdate, nextSong, prevSong, resetRoom } = useFirestoreAction()

  const [songList, setSongList] = useState([])
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [isNextDisabled, setNextDisabled] = useState<boolean>(false)
  const [isPrevDisabled, setPrevDisabled] = useState<boolean>(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    if (playlist) {
      setSongList(playlist.slice(currentSong))
    }
    //Next Btn
    if (playlist.length <= currentSong) {
      setNextDisabled(true)
    } else {
      setNextDisabled(false)
    }
    //Prev Btn
    if (currentSong <= 0) {
      setPrevDisabled(true)
    } else {
      setPrevDisabled(false)
    }
  }, [playlist, currentSong])

  const onDragEnd = (result) => {
    if (!result.destination) return

    const reorderedList = reorder(
      songList,
      result.source.index,
      result.destination.index
    )
    playlistUpdate(roomId, reorderedList)
    setSongList(reorderedList)
  }

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  const handleNextSong = () => {
    nextSong(roomId)
  }

  const handlePreviousSong = () => {
    if (currentSong > 0) {
      prevSong(roomId)
    }
  }

  const getDuration = (songList) => {
    const totalSeconds = songList.reduce((accumulator, song: ISong) => {
      return accumulator + song.duration
    }, 0)
    return secondsToHours(totalSeconds)
  }

  const isFav = (song) => {
    if (currentUser) {
      const hasSong = currentUser.favorites?.find(
        (favSong) => favSong.songId === song.songId
      )
      return hasSong
    }
    return false
  }

  return (
    <>
      <Tabs
        variant="enclosed"
        isFitted
        w="100%"
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>Playlist</Tab>
          <Tab>Search</Tab>
          <Tab>Favorites</Tab>
          <Tab>Controls</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
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
            {playlist.length <= currentSong && (
              <Box w="100" textAlign="center">
                <Button
                  onClick={() => resetRoom(roomId)}
                  size="lg"
                  variant="outline"
                >
                  Restart
                </Button>
              </Box>
            )}
          </TabPanel>
          <TabPanel>
            <SongSearch
              changeTab={handleTabsChange}
              handleShowPreview={handleShowPreview}
            />
          </TabPanel>
          <TabPanel>
            <VStack>
              {currentUser?.favorites?.map((song) => (
                <SongBox
                  songData={song}
                  showModal={() => showFavModal()}
                  changeTab={handleTabsChange}
                  currentTab={tabIndex}
                  fromFavorites={isFav(song)}
                />
              ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              <Box
                padding="2"
                border="1px"
                borderRadius="sm"
                w="90%"
                textAlign="center"
              >
                Duration:
                {getDuration(songList)}
              </Box>
              <Button
                leftIcon={<FaForward />}
                onClick={handleNextSong}
                disabled={isNextDisabled}
                size="lg"
                w="90%"
              >
                Next
              </Button>
              <Button
                leftIcon={<FaBackward />}
                onClick={handlePreviousSong}
                disabled={isPrevDisabled}
                size="lg"
                w="90%"
              >
                Previous
              </Button>
              <Button onClick={() => resetRoom(roomId)} size="lg" w="90%">
                Restart
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default UserPlaylistContainer
