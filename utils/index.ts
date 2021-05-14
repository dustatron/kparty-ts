import Rooms from "./mockData/Rooms";
import {
  IRoom,
  ISong,
  IVideoData,
  IUser,
  IAuth,
  IUseFetchYT,
} from "./interfaces";
import { useFetchYT } from "./useFetchYT";
import { useAuth, AuthProvider } from "./context/AuthContext";
import { GameDataProvider, useGameData } from "./context/GameDataContext";
import { auth } from "./firebase";

export {
  Rooms,
  useFetchYT,
  useAuth,
  AuthProvider,
  auth,
  GameDataProvider,
  useGameData,
};
export type { IRoom, ISong, IVideoData, IUser, IAuth, IUseFetchYT };
