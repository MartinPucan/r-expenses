import React, { useContext, useEffect, useMemo, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  currentUser: any;
  isAuthenticated: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  logIn: (data: { email: string; password: string }) => Promise<any>;
  logOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  signUp: async (email: string, password: string) => {},
  logIn: async (data: { email: string; password: string }) => {},
  logOut: async () => {},
});

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

interface IAuthProvider {
  children: JSX.Element;
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  const logIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => auth.signOut();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      // @ts-ignore
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      signUp,
      logIn,
      logOut,
    }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
