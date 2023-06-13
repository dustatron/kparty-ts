import { ISong, IVideoData, useAuth } from "../../utils";
import React from "react";
import SongBox from "../SongBox";
import { VStack } from "@chakra-ui/react";

interface Props {
  favorites: ISong[];
  handleTabsChange: (index: number) => void;
  tabIndex: number;
  roomId: string;
  isKJ?: boolean;
}

export const Favorites = ({
  favorites,
  handleTabsChange,
  tabIndex,
  roomId,
  isKJ,
}: Props) => {
  const { currentUser } = useAuth();
  const isFav = (song) => {
    if (currentUser) {
      const hasSong = currentUser.favorites?.find(
        (favSong) => favSong.songId === song.songId
      );
      return hasSong;
    }
    return false;
  };
  return (
    <VStack>
      {favorites?.map((song: ISong, index) => (
        <SongBox
          key={`${index}-${song.songTitle}`}
          songData={song}
          changeTab={handleTabsChange}
          currentTab={tabIndex}
          fromFavorites={isFav(song)}
          roomId={roomId}
          isFavView
          isKJ
        />
      ))}
    </VStack>
  );
};
