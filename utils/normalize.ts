import { ISong, IUser } from "./index";

export const videoToSong = (videoData, user: IUser) => {
  if (videoData?.singer) return videoData
  const { title, artist, duration, id, publishedAt } = videoData;

  const thumbnail = `https://i.ytimg.com/vi/${id}/default.jpg`;
  const link = `https://www.youtube.com/watch?v=${id}`;

  const song: ISong = {
    artist,
    duration,
    link,
    playCount: 0,
    publishedAt,
    songId: id,
    songTitle: title,
    thumbnail,
    userRating: 0,
    videoId: id,
    singer: user.displayName,
    userPhoto: user.photoURL,
  };

  return song;
};
