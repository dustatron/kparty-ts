import React, { useState } from "react"
import firebase from "firebase/app"
import "firebase/firestore"
import { ISongAction, ISong, ActionTypes, IRoom, IUser } from "../../utils"

const useFirestoreAction = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Creates doc for cloud function
  const createAction = (payload: ISongAction) => {
    setIsLoading(true)
    const actionRef = firebase.firestore().collection("actions")
    actionRef.add(payload).then(() => {
      setIsLoading(false)
    })
  }

  const roomsDB = firebase.firestore().collection("rooms")
  const songsDB = firebase.firestore().collection("songs")
  const userDB = firebase.firestore().collection("users")

  const addSong = (song, roomId) => {
    roomsDB
      .doc(roomId)
      .update({
        playlist: firebase.firestore.FieldValue.arrayUnion(song),
      })
      .then(() => {
        setIsLoading(true)
      })
      .catch((err) => setError(err))
  }

  const removeSong = (song: ISong, roomId: any) => {
    setIsLoading(true)
    const { arrayRemove } = firebase.firestore.FieldValue
    roomsDB
      .doc(roomId)
      .update({ playlist: arrayRemove(song) })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => setError(err))
  }

  const removeFavorite = (song: ISong, user) => {
    const { arrayRemove } = firebase.firestore.FieldValue
    const userRef = userDB.doc(user.uid)
    userRef.update({ favorites: arrayRemove(song) })
  }

  const nextSong = (roomId) => {
    setIsLoading(true)
    const { increment } = firebase.firestore.FieldValue
    roomsDB
      .doc(roomId)
      .update({ currentSong: increment(1) })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => setError(err))
  }

  const prevSong = (roomId) => {
    setIsLoading(true)
    const { increment } = firebase.firestore.FieldValue
    roomsDB
      .doc(roomId)
      .update({ currentSong: increment(-1) })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => setError(err))
  }

  const setIsActive = (roomId, isPlaying) => {
    roomsDB
      .doc(roomId)
      .update({ isActive: isPlaying })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => setError(err))
  }

  const playlistUpdate = (roomId: string, playlistUpdated: ISong[]) => {
    const roomDoc = roomsDB.doc(roomId)
    roomDoc
      .update({ playlist: playlistUpdated })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => setError(err))
  }

  const addFavSong = (song: ISong, currentUser: IUser) => {
    const userRef = userDB.doc(currentUser.uid)
    const newSong: ISong = {
      ...song,
      singer: currentUser.displayName,
      userPhoto: currentUser.photoURL,
    }
    userRef.update({
      favorites: firebase.firestore.FieldValue.arrayUnion(newSong),
    })
  }

  const resetRoom = (roomId) => {
    const roomDoc = roomsDB.doc(roomId)
    roomDoc
      .update({ currentSong: 0 })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => setError(err))
  }

  return {
    error,
    isLoading,
    addSong,
    nextSong,
    prevSong,
    removeSong,
    setIsActive,
    playlistUpdate,
    addFavSong,
    removeFavorite,
    resetRoom,
  }
}

export default useFirestoreAction
