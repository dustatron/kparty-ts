import { FirebaseError } from "firebase/firebase-auth"
export interface IVideoData {
  artist: string
  duration: number
  id: string
  original_title: string
  publishedAt: string
  title: string
}

export interface IUseFetchYT {
  isLoading: boolean
  results: IVideoData[]
  error: string
  runSearch: (string) => void
  clearResults: () => void
}
export interface IUser {
  displayName: string
  email: string
  photoURL: string
  uid: string
  favorites?: ISong[]
}
export interface IAuth {
  currentUser: IUser
  login: () => void
  loginWithGithub: () => void
  logout: () => void
  error?: FirebaseError
  loading: boolean
}
export interface ISong {
  videoId: string
  link?: string
  thumbnail?: string
  songTitle?: string
  songId: string
  artist?: string
  duration?: number
  userRating?: number
  playCount?: number
  singer?: string
  publishedAt?: string
  userPhoto?: string
}
export interface IRoom {
  title: string
  people: number
  id: string
  isActive: boolean
  currentSong: number
  playlist: Array<ISong>
  isPublic?: boolean
}

export interface ISongAction {
  type: string
  roomId: string | string[]
  authorId?: string
  authorName?: string
  createdAt?: Date
  isPlaying?: boolean
  song?: ISong
  playlist?: ISong[]
}

export enum ActionTypes {
  addSong = "ADD_SONG",
  nextSong = "NEXT_SONG",
  prevSong = "PREV_SONG",
  deleteSong = "DELETE_SONG",
  isPlaying = "SET_IS_PLAYING",
  PlaylistUpdate = "PLAYLIST_UPDATE",
}

export interface useTube {
  id: string
  original_title: string
  title: string
  artist: string
  duration: string
  publishedAt: String
}

export interface RoomDataHook {
  roomData: IRoom
  playlist: Array<ISong>
  setRoomKey: (string) => void
  isLoading: boolean
  selected: ISong
  setSelected: (sting) => void
}
