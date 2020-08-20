import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";

import UploadFinalScreen from "../screens/UploadFinalScreen";
import PhotoSelectScreen from "../screens/PhotoSelectScreen";

export default function uploadNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={PhotoSelectScreen} name="PhotoSelectScreen" />
      <Stack.Screen component={UploadFinalScreen} name="uploadFinal" />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
