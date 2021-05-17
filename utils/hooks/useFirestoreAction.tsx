import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { ISongAction, ISong, ActionTypes, IRoom } from "../../utils";

const useFirestoreAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Creates doc for cloud function
  const createAction = (payload: ISongAction) => {
    setIsLoading(true);
    const actionRef = firebase.firestore().collection("actions");
    actionRef.add(payload).then(() => {
      setIsLoading(false);
    });
  };

  /*  example function for action creator

  const playlistUpdate = (roomId: string, playlist: ISong[]) => {
    const playlistPayload: ISongAction = {
      type: ActionTypes.PlaylistUpdate,
      roomId,
      playlist,
    };

    createAction(playlistPayload);
  };
  
  
  */

  const roomsDB = firebase.firestore().collection("rooms");
  const songsDB = firebase.firestore().collection("songs");

  const addSong = (songPayload) => {
    const { song, roomId } = songPayload;
    setIsLoading(true);

    roomsDB
      .doc(roomId)
      .update({
        playlist: firebase.firestore.FieldValue.arrayUnion(song),
      })
      .then(() => {
        setIsLoading(true);
      })
      .catch((err) => setError(err));
  };

  const removeSong = (song: ISong, roomId: any) => {
    setIsLoading(true);
    const { arrayRemove } = firebase.firestore.FieldValue;
    roomsDB
      .doc(roomId)
      .update({ playlist: arrayRemove(song) })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  };

  const nextSong = (roomId) => {
    setIsLoading(true);
    const { increment } = firebase.firestore.FieldValue;
    roomsDB
      .doc(roomId)
      .update({ currentSong: increment(1) })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  };

  const prevSong = (roomId) => {
    setIsLoading(true);
    const { increment } = firebase.firestore.FieldValue;
    roomsDB
      .doc(roomId)
      .update({ currentSong: increment(-1) })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  };

  const setIsActive = (roomId, isPlaying) => {
    roomsDB
      .doc(roomId)
      .update({ isActive: isPlaying })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  };

  const playlistUpdate = (roomId: string, playlistUpdated: ISong[]) => {
    const roomDoc = roomsDB.doc(roomId);
    roomDoc
      .update({ playlist: playlistUpdated })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  };

  return {
    error,
    isLoading,
    addSong,
    nextSong,
    prevSong,
    removeSong,
    setIsActive,
    playlistUpdate,
  };
};

export default useFirestoreAction;
