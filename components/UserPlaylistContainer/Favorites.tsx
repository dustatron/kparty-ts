import { VStack } from "@chakra-ui/react"
import React from "react"
import { ISong } from "../../utils"
import SongBox from "../SongBox"

interface Props {
  favorites: ISong[]
  showFavModal: () => void
  handleTabsChange: (index: number) => void
  tabIndex: number
  isFav: (song: ISong) => boolean
}

export const Favorites = ({
  favorites,
  showFavModal,
  handleTabsChange,
  tabIndex,
  isFav,
}: Props) => {
  return (
    <VStack>
      {favorites?.map((song: ISong, index) => (
        <SongBox
          key={`${index}-${song.songTitle}`}
          songData={song}
          showModal={() => showFavModal()}
          changeTab={handleTabsChange}
          currentTab={tabIndex}
          fromFavorites={isFav(song)}
        />
      ))}
    </VStack>
  )
}
