import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { ISongAction } from "../../utils";

const useFirestoreAction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addSong = (songPayload: ISongAction) => {
    setIsLoading(true);
    const actionRef = firebase.firestore().collection("actions");
    actionRef.add(songPayload).then(() => {
      setIsLoading(false);
    });
  };

  return { isLoading, addSong };
};

export default useFirestoreAction;
