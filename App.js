import { StatusBar } from "expo-status-bar";
import * as firebase from "firebase";

import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
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
    firebase.initializeApp(firebaseConfig);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
