import Rooms from "./mockData/Rooms";
import {
  IRoom,
  ISong,
  IVideoData,
  IUser,
  IAuth,
  IUseFetchYT,
  ISongAction,
  ActionTypes,
} from "./interfaces";
import { useFetchYT } from "./useFetchYT";
import { useAuth, AuthProvider } from "./context/AuthContext";
import { RoomDataProvider, useRoomData } from "./context/RoomDataContext";
import { auth } from "./firebase";
import useFirestoreAction from "./hooks/useFirestoreAction";

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
};
export type {
  IRoom,
  ISong,
  IVideoData,
  IUser,
  IAuth,
  IUseFetchYT,
  ISongAction,
};
