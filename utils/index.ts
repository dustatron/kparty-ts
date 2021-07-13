import Rooms from "./mockData/Rooms"
import {
  RoomDataHook,
  IRoom,
  ISong,
  IVideoData,
  IUser,
  IAuth,
  IUseFetchYT,
  ISongAction,
  ActionTypes,
} from "./interfaces"
import { useFetchYT } from "./useFetchYT"
import { useAuth, AuthProvider } from "./context/AuthContext"
import { RoomDataProvider, useRoomData } from "./context/RoomDataContext"
import { secondsToHours } from "./tools"
import { auth } from "./firebase"
import useFirestoreAction from "./hooks/useFirestoreAction"
import { videoToSong } from "./normalize"

export {
  Rooms,
  useFetchYT,
  useAuth,
  AuthProvider,
  auth,
  RoomDataProvider,
  useRoomData,
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
  IUseFetchYT,
  ISongAction,
  RoomDataHook,
}
