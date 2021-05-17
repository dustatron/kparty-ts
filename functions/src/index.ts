import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export enum ActionTypes {
  addSong = "ADD_SONG",
  nextSong = "NEXT_SONG",
  prevSong = "PREV_SONG",
  deleteSong = "DELETE_SONG",
  isPlaying = "SET_IS_PLAYING",
  PlaylistUpdate = "PLAYLIST_UPDATE",
}

export interface ISong {
  videoId: string;
  link?: string;
  thumbnail?: string;
  songTitle?: string;
  songId: string;
  artist?: string;
  duration?: number;
  userRating?: number;
  playCount?: number;
  singer?: string;
  publishedAt?: string;
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.actionHandler = functions.firestore
  .document("actions/{actionId}")
  .onCreate((snapshot) => {
    const { roomId, type, song } = snapshot.data();
    const db = admin.firestore();
    const roomRef = db.doc(`rooms/${roomId}`);

    switch (type) {
      case ActionTypes.addSong:
        addSongAction(roomId, song, roomRef, db);
      case ActionTypes.nextSong:
        nextSongAction(roomId, roomRef);
      case ActionTypes.prevSong:
        prevSongAction(roomId, roomRef);
      case ActionTypes.deleteSong:
        deleteSong(song, roomRef);
      default:
        break;
    }

    return snapshot.ref.delete();
  });

const prevSongAction = (roomId: string, roomRef: any) => {
  roomRef
    .get()
    .then((doc: any) => doc.data())
    .then((roomData: any) => {
      if (roomData.currentSong !== 0) {
        const newCurrent = roomData.currentSong - 1;
        return roomRef
          .update({ currentSong: newCurrent })
          .catch((error: any) => functions.logger.log(error));
      }
    })
    .catch((error: any) => functions.logger.log(error));
};

const nextSongAction = (roomId: string, roomRef: any) => {
  roomRef
    .get()
    .then((doc: any) => doc.data())
    .then((roomData: any) => {
      const newCurrent = roomData.currentSong + 1;
      return roomRef
        .update({ currentSong: newCurrent })
        .catch((error: any) => functions.logger.log(error));
    })
    .catch((error: any) => functions.logger.log(error));
};

const addSongAction = (roomId: string, song: ISong, roomRef: any, db: any) => {
  roomRef.update({
    playlist: admin.firestore.FieldValue.arrayUnion(song),
  });

  db.collection("songs")
    .add({ ...song })
    .catch((error: any) => functions.logger.log(error));
  functions.logger.log("add Song");

  // roomRef
  //   .get()
  //   .then((doc: any) => doc.data())
  //   .then((roomData: any) => {
  //     const newPlaylist = [...roomData.playlist, song];
  //     roomRef
  //       .update({ playlist: newPlaylist })
  //       .catch((error: any) => functions.logger.log(error));
  //     functions.logger.log("update Room");
  //   })
  //   .catch((error: any) => functions.logger.log(error));
};

const deleteSong = (song: ISong, roomRef: any) => {
  roomRef.update({
    playlist: admin.firestore.FieldValue.arrayRemove(song),
  });
};
