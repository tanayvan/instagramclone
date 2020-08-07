import * as firebase from "firebase";

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import AuthContext from "./AuthContext/Context";
import AuthNavigation from "./Navigations/AuthNavigation";
import AppNavigation from "./Navigations/AppNavigation";

var firebaseConfig = {
  apiKey: "AIzaSyAm4VoPnUQETyoWATw9ROP84bF0AryGeSc",
  authDomain: "instagram-clone-7a664.firebaseapp.com",
  databaseURL: "https://instagram-clone-7a664.firebaseio.com",
  projectId: "instagram-clone-7a664",
  storageBucket: "instagram-clone-7a664.appspot.com",
  messagingSenderId: "254055267034",
  appId: "1:254055267034:web:8aaf00e8c7d2e857f843e3",
  measurementId: "G-16FSYRLHNX",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUser(user);
      }
      unsubscribe();
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? <AppNavigation /> : <AuthNavigation />}
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({});
