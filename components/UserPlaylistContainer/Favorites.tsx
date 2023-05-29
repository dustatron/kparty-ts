import { ISong } from "../../utils";
import React from "react";
import SongBox from "../SongBox";
import { VStack } from "@chakra-ui/react";

interface Props {
  favorites: ISong[];
  showFavModal: () => void;
  handleTabsChange: (index: number) => void;
  tabIndex: number;
  isFav: (song: ISong) => boolean;
  roomId: string;
}

export const Favorites = ({
  favorites,
  showFavModal,
  handleTabsChange,
  tabIndex,
  isFav,
  roomId,
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
          roomId={roomId}
        />
      ))}
    </VStack>
  );
};
