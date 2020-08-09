import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import ProfilePage from "../screens/ProfilePage";
import colors from "../config/colors";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AuthNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Profile") {
              iconName = "user";
            } else if (route.name === "Search") {
              iconName = "search";
            } else if (route.name === "Activity") {
              iconName = "heart";
            } else if (route.name === "Upload") {
              iconName = "plus-square-o";
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={30} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.white,
          inactiveTintColor: colors.grey,
          activeBackgroundColor: colors.primary,
          inactiveBackgroundColor: colors.primary,
          showLabel: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={ProfilePage} />
        <Tab.Screen name="Upload" component={ProfilePage} />
        <Tab.Screen name="Activity" component={ProfilePage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
