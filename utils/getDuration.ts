import { secondsToHours } from "./tools";
import { ISong } from "./Types";

const getDuration = (seconds) => {
  const toMinutes = seconds / 60;
  const time = toMinutes.toFixed(2);
  return time.toString().replace(".", ":");
};

export default getDuration

export const getDurationSongList = (songList) => {
  const totalSeconds = songList?.reduce((accumulator, song: ISong) => {
    return accumulator + song.duration;
  }, 0);
  return secondsToHours(totalSeconds);
};
