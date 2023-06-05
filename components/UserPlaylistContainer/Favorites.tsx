import { ISong, IVideoData } from "../../utils";
import React from "react";
import SongBox from "../SongBox";
import { VStack } from "@chakra-ui/react";

interface Props {
  favorites: ISong[];
  showFavModal: () => void;
  handleTabsChange: (index: number) => void;
  tabIndex: number;
  showPreview: (songData: ISong | IVideoData) => void;
  isFav: (song: ISong) => boolean;
  roomId: string;
}

export const Favorites = ({
  favorites,
  showFavModal,
  showPreview,
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
          showModal={() => showPreview(song)}
          changeTab={handleTabsChange}
          currentTab={tabIndex}
          fromFavorites={isFav(song)}
          roomId={roomId}
        />
      ))}
    </VStack>
  );
};
