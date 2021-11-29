import React, { useEffect, useState } from "react"
import { ISong, useFirestoreAction, useAuth, secondsToHours } from "../../utils"
import { Playlist, Favorites, Controls, Search } from "./"
import {
  Box,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Center,
  Text,
  Button,
} from "@chakra-ui/react"

interface Props {
  showModal: () => void
  playlist: ISong[]
  roomId: any
  showFavModal: () => void
  currentSong: number
  isActive: boolean
  handleShowPreview: (link, title, handleSave) => void
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
  const { nextSong, prevSong, resetRoom, createPlaylist, deletePlaylist } =
    useFirestoreAction(roomId)

  const [songList, setSongList] = useState([])
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [isNextDisabled, setNextDisabled] = useState<boolean>(false)
  const [isPrevDisabled, setPrevDisabled] = useState<boolean>(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    if (playlist) {
      setSongList(playlist?.slice(currentSong))
    } else {
    }
    if (!playlist || playlist.length === 0) {
      createPlaylist()
    }
    //Next Btn
    if (playlist?.length <= currentSong) {
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
            {playlist && (
              <Playlist
                songList={songList}
                currentSong={currentSong}
                playlist={playlist}
                roomId={roomId}
                handleTabsChange={handleTabsChange}
                isActive={isActive}
                isFav={isFav}
                setSongList={setSongList}
                showModal={showModal}
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
          <TabPanel>
            <Search
              handleTabsChange={handleTabsChange}
              handleShowPreview={handleShowPreview}
            />
          </TabPanel>
          <TabPanel>
            <Favorites
              favorites={currentUser.favorites}
              showFavModal={showFavModal}
              handleTabsChange={handleTabsChange}
              tabIndex={tabIndex}
              isFav={isFav}
            />
          </TabPanel>
          <TabPanel>
            <Controls
              getDuration={() => getDuration(songList)}
              handleNextSong={handleNextSong}
              isNextDisabled={isNextDisabled}
              handlePreviousSong={handlePreviousSong}
              isPrevDisabled={isPrevDisabled}
              resetRoom={() => resetRoom()}
              deletePlaylist={deletePlaylist}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default UserPlaylistContainer
