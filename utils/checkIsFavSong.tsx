import { ISong } from "./Types";

export default function checkIsFavSong(song: ISong, currentUser: any) {
  if (currentUser) {
    const hasSong = currentUser.favorites?.find(
      (favSong) => favSong.songId === song.songId
    );
    return hasSong;
  }
  return false;
}
