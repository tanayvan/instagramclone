import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import colors from "../config/colors";

export default function AppButton({ name, styleprop, onSubmit }) {
  return (
    <TouchableOpacity style={[styles.button, styleprop]} onPress={onSubmit}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "100%",
    marginTop: 10,
  },
  text: {
    color: "white",
  },
});
