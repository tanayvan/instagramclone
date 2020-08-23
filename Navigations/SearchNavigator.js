import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen";
import OtherUserProfile from "../screens/OtherUserProfile";

export default function SearchNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={SearchScreen} name="Search" />
      <Stack.Screen component={OtherUserProfile} name="OtherUserProfile" />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
