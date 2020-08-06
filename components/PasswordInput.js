import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
export default function PasswordInput({ onchange, value }) {
  const [click, setClick] = useState(false);
  const [icon, setIcon] = useState("eye-slash");
  const [isSecure, setIsSecure] = useState(true);

  const handleClick = () => {
    if (click) {
      setIcon("eye-slash");
      setClick(false);
      setIsSecure(true);
    } else {
      setIcon("eye");
      setClick(true);
      setIsSecure(false);
    }
  };
  return (
    <View>
      <TextInput
        placeholder="Password"
        style={styles.textinput}
        secureTextEntry={isSecure}
        onChangeText={onchange}
        value={value}
      />
      <TouchableOpacity style={styles.icon} onPress={handleClick}>
        <FontAwesome name={icon} size={20} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    left: 320,
    top: 22,
  },
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
