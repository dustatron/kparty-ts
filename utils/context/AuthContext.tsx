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
  error?: string;
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
  const [error, setError] = useState();

  const login = async () => {
    setError(undefined);
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(undefined);
    } catch (error) {
      setError(error);
      console.error(error.message);
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
      }
    });
    setLoading(false);
    return unsubscribe;
  }, []);

  const value: IAuth = {
    currentUser,
    login,
    logout,
    error,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
