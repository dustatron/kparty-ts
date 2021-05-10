export interface ISong {
  link: string;
  thumbnail: string;
  songTitle: string;
  songId: string;
  artist: string;
  userRating: number;
  playCount: number;
  singer?: string;
}

export interface IRoom {
  title: string;
  people: number;
  id: string;
  isActive: boolean;
  currentSong: number;
  playlist: Array<ISong>;
}

const Rooms: IRoom[] = [
  {
    title: "Happy Hour",
    people: 3,
    id: "happyHour",
    isActive: false,
    currentSong: 0,
    playlist: [
      {
        link: "https://www.youtube.com/watch?v=1dsdTdAZRYU",
        thumbnail: "",
        songTitle: "Careless Whisper",
        songId: "1",
        artist: "George Michael (Wham!)",
        singer: "Amy",
        playCount: 1,
        userRating: 1,
      },
      {
        link: "https://www.youtube.com/watch?v=aMqnd93EqSk",
        thumbnail: "https://i.ytimg.com/vi/aMqnd93EqSk/default.jpg",
        songTitle:
          "♬ Thank You for Being a Friend Karaoke Version - The Golden Girls",
        songId: "2",
        artist: "unknown",
        userRating: 2,
        playCount: 1,
        singer: "Dusty",
      },
      {
        link: "https://www.youtube.com/watch?v=yZ9_MnrivLI",
        thumbnail: "https://i.ytimg.com/vi/kMIj0P0JJvs/default.jpg",
        songTitle: "Bobby Darin - Beyond The Sea (Karaoke version with Lyrics)",
        songId: "3",
        artist: "unknown",
        userRating: 2,
        playCount: 1,
        singer: "Cody",
      },
      {
        link: "https://www.youtube.com/watch?v=FvdsYTCK3HA",
        thumbnail: "https://i.ytimg.com/vi/kMIj0P0JJvs/default.jpg",
        songTitle:
          "Modern Talking - You're My Heart, You're My Soul (Back-Vocal) (Original Karaoke Version)",
        songId: "4",
        artist: "unknown",
        userRating: 2,
        playCount: 1,
        singer: "Amy",
      },
      {
        link: "https://www.youtube.com/watch?v=FvdsYTCK3HA",
        thumbnail: null,
        songTitle:
          "Modern Talking - You're My Heart, You're My Soul (Back-Vocal) (Original Karaoke Version)",
        songId: "5",
        artist: "unknown",
        userRating: 2,
        playCount: 1,
        singer: "Amy",
      },
      {
        link: "https://www.youtube.com/watch?v=FvdsYTCK3HA",
        thumbnail: "https://i.ytimg.com/vi/kMIj0P0JJvs/default.jpg",
        songTitle:
          "Modern Talking - You're My Heart, You're My Soul (Back-Vocal) (Original Karaoke Version)",
        songId: "6",
        artist: "unknown",
        userRating: 2,
        playCount: 1,
        singer: "Amy",
      },
      {
        link: "https://www.youtube.com/watch?v=C3y6jGCXiUA",
        thumbnail: "https://i.ytimg.com/vi/kMIj0P0JJvs/default.jpg",
        songTitle: "Olivia Rodrigo - drivers license (Karaoke Version)",
        songId: "7",
        artist: "unknown",
        userRating: 2,
        playCount: 1,
        singer: "Nad",
      },
    ],
  },
  {
    title: "Girls Night",
    people: 3,
    id: "GirlsNight",
    isActive: false,
    currentSong: 0,
    playlist: [],
  },
  {
    title: "Epic Karaoke",
    people: 3,
    id: "EpicKaraoke",
    isActive: false,
    currentSong: 0,
    playlist: [],
  },
];

export default Rooms;
