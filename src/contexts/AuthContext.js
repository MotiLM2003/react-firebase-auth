import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signUp = (email, password) => {
    try {
      auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('erorr');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
