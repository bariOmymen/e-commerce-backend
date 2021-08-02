// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signUp, signOut } from "./actions/userActions";
//import * as firebase from "firebase/app";
//import "firebase/auth";
// Add your Firebase credentials
/*firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  appID: "",
});*/
const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
 const signin = (email, password) => {
   dispatch(signIn(email, password));
   setUser(true);
      
  };
  const signUp = (name ,email, password) => {
    dispatch(signUp(name, email, password))
    setUser(true)
  };
  const signout = () => {
    dispatch(signOut());
    setUser(false);
  };
  const sendPasswordResetEmail = (email) => {
    return ''
  };
  const confirmPasswordReset = (code, password) => {
    return ''
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
 /* useEffect(() => {
    //const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
   
    // Cleanup subscription on unmount
  
  });*/
  // Return the user object and auth methods
  return {
    user,
    signin,
    signUp,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}