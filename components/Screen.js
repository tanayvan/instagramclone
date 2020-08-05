import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Screen({ children, stylesprop }) {
  return <View style={[styles.container, stylesprop]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "black",
  },
});
