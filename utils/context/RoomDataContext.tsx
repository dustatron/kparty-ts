import React, {
  useContext,
  useState,
  useEffect,
  ReactElement,
  createContext,
} from "react"
import { RoomDataHook } from "../index"
import firebase from "firebase/app"
import "firebase/firestore"
import { isNil } from "lodash"

// This seems like a mistake
// type RoomDataContext = {
//   currentUser: object
//   login: () => void
//   logout: () => void
// }

const RoomDataContext = createContext(null)

export function useRoomData() {
  return useContext<RoomDataHook>(RoomDataContext)
}

export function RoomDataProvider({ children }): ReactElement {
  const [roomData, setRoomData] = useState(null)
  const [playlist, setPlaylist] = useState(null)
  const [roomKey, setRoomKey] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!roomData && roomKey) {
      setIsLoading(true)
      const roomDBRef = firebase.firestore().collection("rooms")
      roomDBRef.doc(roomKey).onSnapshot((doc) => {
        const data = doc.data()
        setRoomData(data)
        setPlaylist(data?.playlist)
        setIsLoading(false)
      })
    }
    if (isNil(roomKey) && roomData) {
      setRoomData(null)
    }
  }, [roomKey])

  const value: RoomDataHook = {
    roomData,
    playlist,
    setRoomKey,
    isLoading,
    selected,
    setSelected,
  }

  return (
    <RoomDataContext.Provider value={value}>
      {children}
    </RoomDataContext.Provider>
  )
}
