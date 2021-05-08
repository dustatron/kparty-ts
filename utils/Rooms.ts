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
  activeSong: number;
  playlist: Array<Song>;
}

const Rooms: Room[] = [
  {
    title: "Happy Hour",
    people: 3,
    id: "happyHour",
    isActive: false,
    activeSong: 0,
    playlist: [
      {
        link: "https://www.youtube.com/watch?v=-RdNw43s40s",
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
    activeSong: 0,
    playlist: [],
  },
  {
    title: "Epic Karaoke",
    people: 3,
    id: "EpicKaraoke",
    isActive: false,
    activeSong: 0,
    playlist: [],
  },
];

export default Rooms;
