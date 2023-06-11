import Rooms from "./mockData/Rooms"
import {
  RoomDataHook,
  IRoom,
  ISong,
  IVideoData,
  IUser,
  IAuth,
  ISongAction,
  ActionTypes,
} from "./interfaces"
import { useFetchYT } from "./useFetchYT"
import { useAuth, AuthProvider } from "./context/AuthContext"
import { secondsToHours } from "./tools"
import { auth } from "./firebase"
import useFirestoreAction from "./hooks/useFirestoreAction"
import { videoToSong } from "./normalize"

export {
  Rooms,
  useAuth,
  AuthProvider,
  auth,
  useFirestoreAction,
  ActionTypes,
  videoToSong,
  secondsToHours,
}
export type {
  IRoom,
  ISong,
  IVideoData,
  IUser,
  IAuth,
  ISongAction,
  RoomDataHook,
}
