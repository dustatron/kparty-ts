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
import { auth } from "./firebase";

export { Rooms, useFetchYT, useAuth, AuthProvider, auth };
export type { IRoom, ISong, IVideoData, IUser, IAuth, IUseFetchYT };
