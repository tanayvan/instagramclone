import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function AppTextInput({
  placeholder,
  keyboardtype,
  onchange,
  value,
}) {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        style={styles.textinput}
        keyboardType={keyboardtype}
        onChangeText={onchange}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    marginTop: 10,
    backgroundColor: "#121212",
    height: 50,
    width: "100%",
    padding: 15,
    borderRadius: 5,
    color: "white",
  },
});
