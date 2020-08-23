import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileComponent from "../components/ProfileComponent";

//This Screen used To View Someone else Profile Not the one who has logged in

export default function OtherUserProfile({ route }) {
  const { email } = route.params;
  return <ProfileComponent email={email} />;
}

const styles = StyleSheet.create({});
