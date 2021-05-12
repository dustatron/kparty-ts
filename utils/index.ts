import Rooms from "./mockData/Rooms";
import { IRoom, ISong, IVideoData, IUser, IAuth } from "./interfaces";
import { fetchYTSongs } from "./apiCall";
import { useAuth, AuthProvider } from "./context/AuthContext";
import { auth } from "./firebase";

export { Rooms, fetchYTSongs, useAuth, AuthProvider, auth };
export type { IRoom, ISong, IVideoData, IUser, IAuth };
