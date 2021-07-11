import { IRoom } from "../index"

const Rooms: IRoom[] = [
  {
    title: "Krystal's Party",
    people: 3,
    id: "krystal",
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
        duration: 350,
        publishedAt: "",
        videoId: "1dsdTdAZRYU",
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
        duration: 100,
        publishedAt: "",
        videoId: "aMqnd93EqSk",
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
        duration: 100,
        publishedAt: "",
        videoId: "yZ9_MnrivLI",
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
]

export default Rooms
