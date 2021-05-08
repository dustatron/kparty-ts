interface Song {
  link: string;
  name: string;
  songId: string;
  artist: string;
  singer: string;
}

interface Room {
  title: string;
  people: number;
  id: string;
  isActive: boolean;
  currentSong: number;
  playlist: Array<Song>;
}

const Rooms: Room[] = [
  {
    title: "Happy Hour",
    people: 3,
    id: "happyHour",
    isActive: false,
    currentSong: 0,
    playlist: [
      {
        link: "https://www.youtube.com/watch?v=1dsdTdAZRYU",
        name: "Careless Whisper",
        songId: "1",
        artist: "George Michael (Wham!)",
        singer: "Amy",
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
