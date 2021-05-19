import React, {
  useContext,
  useState,
  useEffect,
  ReactElement,
  createContext,
} from "react";
import firebase from "firebase/app";
import { auth, IUser, IAuth, ISong } from "../index";

type AuthContext = {
  currentUser: object;
  login: () => void;
  logout: () => void;
};

interface useAuth {
  currentUser;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext(null);

export function useAuth(): useAuth {
  return useContext(AuthContext);
}

export function AuthProvider({ children }): ReactElement {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserProfile = (user) => {
    const userDB = firebase.firestore().collection("users");
    if (user.uid) {
      const userData = userDB.doc(user.uid);
      userData.onSnapshot((snap) => {
        if (snap.exists) {
          const data = snap.data();
          setCurrentUser(data);
        } else {
          userData
            .set({
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
              favorites: [],
            })
            .then(() => setLoading(false));
        }
      });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserProfile(user);
        setLoading(false);
      } else {
        setCurrentUser(user);
      }
    });

    return unsubscribe;
  }, []);

  const value: IAuth = {
    currentUser,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
