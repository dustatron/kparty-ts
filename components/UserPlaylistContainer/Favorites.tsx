import { ISong, useAuth } from "../../utils";
import React from "react";
import SongBox from "../SongBox";
import { VStack } from "@chakra-ui/react";
import checkIsFavSong from "../../utils/checkIsFavSong";

interface Props {
  handleTabsChange: (index: number) => void;
  tabIndex: number;
}

export const Favorites = ({ handleTabsChange, tabIndex }: Props) => {
  const { currentUser } = useAuth();

  return (
    <VStack>
      {currentUser.favorites?.map((song: ISong, index) => (
        <SongBox
          key={`${index}-${song.songTitle}`}
          songData={song}
          changeTab={handleTabsChange}
          currentTab={tabIndex}
          fromFavorites={checkIsFavSong(song, currentUser)}
          isFavView
        />
      ))}
    </VStack>
  );
};
