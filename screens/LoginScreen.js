import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { auth } from "firebase";

import logo from "../assets/Logo.png";

import Screen from "../components/Screen";
import AppTextInput from "../components/TextInput";
import AppButton from "../components/AppButton";
import PasswordInput from "../components/PasswordInput";
import colors from "../config/colors";
import { onChange } from "react-native-reanimated";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const onchange = () => {};
  const handleSubmit = () => {
    auth()
      .signInWithEmailAndPassword("tanayvan258@gmail.com", "rock1999")
      .then((token) => {
        if (token.user) {
          console.log(email);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Screen stylesprop={styles.container}>
      <View style={styles.formContainer}>
        <Image
          source={logo}
          style={{
            height: 100,
            width: "60%",
            display: "flex",
            justifyContent: "center",
            marginLeft: 70,
          }}
        />
        <View style={styles.formInputContainer}>
          <View style={styles.formSubContainer}>
            <View>
              <Text style={{ color: "red" }}>Error</Text>
              <AppTextInput
                placeholder="Phone number, username or Email"
                keyboardtype="email-address"
              />
            </View>
            <PasswordInput />
            <View style={styles.button}>
              <AppButton name="Login" onSubmit={handleSubmit} />
            </View>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>or</Text>
          <Text style={styles.text}>Don't have an account ?</Text>
          <Text
            style={{
              color: colors.secondary,
              position: "absolute",
              top: 19,
              right: 79,
            }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  formInputContainer: {
    marginLeft: 50,
    width: "90%",
  },
  formSubContainer: {
    paddingRight: 25,
  },
  text: {
    color: "white",
  },
  textContainer: {
    marginTop: 90,
    display: "flex",

    alignItems: "center",
  },
});
