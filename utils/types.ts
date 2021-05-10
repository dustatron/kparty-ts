export interface IVideoData {
  artist: string;
  duration: number;
  id: string;
  original_title: string;
  publishedAt: string;
  title: string;
}

export interface ISong {
  videoId: string;
  link: string;
  thumbnail: string;
  songTitle: string;
  songId: string;
  artist: string;
  duration: number;
  userRating: number;
  playCount: number;
  singer?: string;
  publishedAt: string;
}

export interface IRoom {
  title: string;
  people: number;
  id: string;
  isActive: boolean;
  currentSong: number;
  playlist: Array<ISong>;
}
