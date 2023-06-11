import React from "react";
import { create } from "zustand";
import { IRoom, ISong } from "../Types";
import firebase from "firebase/app";
import useFirestoreAction from "./useFirestoreAction";

type RoomData = {
  playlist: ISong[];
  remainingSongs: ISong[];
  roomData?: IRoom;
  roomKey?: string;
  setPlaylist: (songs: ISong[]) => void;
  setRoomKey: (roomKey?: string) => void;
  selected?: ISong;
  setSelected: (sting) => void;
  setRoomData: (roomData: IRoom) => void;
  setRemainingSongs: (songList: ISong[]) => void;
  clearRoomData: () => void;
};

function fetchRoomData(
  set: (
    partial:
      | RoomData
      | Partial<RoomData>
      | ((state: RoomData) => RoomData | Partial<RoomData>),
    replace?: boolean
  ) => void,
  roomKey: string,
  roomData?: IRoom
) {
  if (!roomData && roomKey) {
    const roomsDBRef = firebase.firestore().collection("rooms");
    roomsDBRef.doc(roomKey).onSnapshot((doc) => {
      const data = doc.data() as IRoom;
      set(() => ({ roomData: data, playlist: data?.playlist }));
      set(() => ({ remainingSongs: data.playlist?.slice(data.currentSong) }));
    });
  }
}

const useRoomData = create<RoomData>((set) => ({
  playlist: [],
  remainingSongs: [],
  roomData: undefined,
  selected: undefined,
  roomKey: undefined,
  setPlaylist: (newList) => set({ playlist: newList }),
  setRoomKey: (roomKey) => {
    set((state) => {
      fetchRoomData(set, roomKey, state.roomData);
      return { roomKey };
    });
  },
  setSelected: (selected) => {
    set({ selected });
  },
  setRoomData: (roomData) => {
    set({ roomData });
  },
  setRemainingSongs: (songList) => {
    set({ remainingSongs: songList });
  },
  clearRoomData: () => set({ roomData: undefined }),
}));
export default useRoomData;
