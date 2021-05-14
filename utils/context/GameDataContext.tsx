import React, {
  useContext,
  useState,
  useEffect,
  ReactElement,
  createContext,
} from "react";
import firebase from "firebase/app";
import { isNil } from "lodash";

type GameDataContext = {
  currentUser: object;
  login: () => void;
  logout: () => void;
};

const GameDataContext = createContext(null);

export function useGameData() {
  return useContext(GameDataContext);
}

export function GameDataProvider({ children }): ReactElement {
  const [roomData, setRoomData] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [roomKey, setRoomKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!roomData && roomKey) {
      setIsLoading(true);
      const roomDBRef = firebase.firestore().collection("rooms");
      roomDBRef.doc(roomKey).onSnapshot((doc) => {
        const data = doc.data();
        setRoomData(data);
        setPlaylist(data?.playlist);
        setIsLoading(false);
      });
    }
    if (isNil(roomKey) && roomData) {
      setRoomData(null);
    }
  }, [roomKey]);

  const value = {
    roomData,
    playlist,
    setRoomKey,
    isLoading,
  };

  return (
    <GameDataContext.Provider value={value}>
      {children}
    </GameDataContext.Provider>
  );
}
