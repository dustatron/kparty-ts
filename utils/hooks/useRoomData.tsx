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
  isKJ: boolean;
  setPlaylist: (songs: ISong[]) => void;
  setRoomKey: (roomKey?: string | string[]) => void;
  selected?: ISong;
  setSelected: (sting) => void;
  setRoomData: (roomData: IRoom) => void;
  setRemainingSongs: (songList: ISong[]) => void;
  setIsKJ: () => void;
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
  isKJ: false,
  setPlaylist: (newList) => set({ playlist: newList }),
  setRoomKey: (roomKey) => {
    if (typeof roomKey === "string") {
      set((state) => {
        fetchRoomData(set, roomKey, state.roomData);
        return { roomKey };
      });
    } else {
      set((state) => {
        fetchRoomData(set, roomKey[0], state.roomData);
        return { roomKey: roomKey[0] };
      });
    }
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
  setIsKJ: () => set({ isKJ: true }),
  clearRoomData: () => set({ roomData: undefined }),
}));
export default useRoomData;
