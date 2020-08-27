import * as firebase from "firebase";
import _ from "lodash";

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, YellowBox } from "react-native";

import AuthContext from "./AuthContext/Context";
import AuthNavigation from "./Navigations/AuthNavigation";
import AppNavigation from "./Navigations/AppNavigation";
import UserContext from "./UserContext/Context";

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
  const [userData, setUserData] = useState();

  const loadUserData = async (email) => {
    await firebase
      .firestore()
      .collection("user")
      .doc(email)
      .get()
      .then((documentSnapshot) => {
        console.log("User exists: ", documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log("User data: ", documentSnapshot.data());
          setUserData(documentSnapshot.data());
          console.log(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const _console = _.clone(console);
    console.warn = (message) => {
      if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
      }
    };
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await loadUserData(user.email);
        setUser(user);
        console.log(user.email);
      }
      await loadUserData(user.email);
      unsubscribe();
    });
  }, []);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {user ? <AppNavigation /> : <AuthNavigation />}
      </AuthContext.Provider>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({});
