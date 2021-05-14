import React, {
  useContext,
  useState,
  useEffect,
  ReactElement,
  createContext,
} from "react";
import firebase from "firebase";
import { auth, IUser, IAuth } from "../index";

type AuthContext = {
  currentUser: object;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }): ReactElement {
  const [currentUser, setCurrentUser] = useState<IUser>(null);
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
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
