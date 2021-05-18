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
  const [isReady, setIsRead] = useState(false);

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const usersRef = firebase.firestore().collection("users");
      if (user?.uid) {
        const userData = usersRef.doc(user.uid);
        userData
          .get()
          .then((doc) => {
            if (doc.exists) {
              const thisUser = doc.data();
              setCurrentUser(thisUser);
            } else {
              userData
                .set({
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                  uid: user.uid,
                  favorites: [],
                })
                .then(() => setCurrentUser(user));
            }
          })
          .then(() => {
            setLoading(false);
          });
      }

      // setCurrentUser(user);
      setLoading(false);
      setIsRead(true);
    });

    return unsubscribe;
  }, []);

  const value: IAuth = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {isReady && children}
    </AuthContext.Provider>
  );
}
