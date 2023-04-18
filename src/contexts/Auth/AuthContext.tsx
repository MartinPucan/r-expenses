import React, { useContext, useEffect, useMemo, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { User } from '@firebase/auth';

interface FormData {
  email: string;
  password: string;
}

interface AuthContextType {
  currentUser: any;
  isAuthenticated: boolean;
  signUp: (data: FormData) => Promise<any>;
  logIn: (data: FormData) => Promise<any>;
  logOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  signUp: async (data: FormData) => {},
  logIn: async (data: FormData) => {},
  logOut: async () => {},
});

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

interface IAuthProvider {
  children: JSX.Element;
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = ({ email, password }: FormData) => createUserWithEmailAndPassword(auth, email, password);

  const logIn = async ({ email, password }: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => auth.signOut();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
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
