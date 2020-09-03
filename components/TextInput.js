import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import colors from "../config/colors";

export default function AppTextInput({
  placeholder,
  keyboardtype,
  onchange,
  value,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textinput}
      keyboardType={keyboardtype}
      onChangeText={onchange}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  textinput: {
    marginTop: 10,
    backgroundColor: colors.dark,
    height: 50,
    width: "100%",
    padding: 15,
    borderRadius: 5,
    color: "white",
  },
});
