import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { auth } from "firebase";

import logo from "../assets/Logo.png";

import Screen from "../components/Screen";
import AppTextInput from "../components/TextInput";
import AppButton from "../components/AppButton";
import PasswordInput from "../components/PasswordInput";
import colors from "../config/colors";
import AuthContext from "../AuthContext/Context";
import UserContext from "../UserContext/Context";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(AuthContext);
  const { userData, setUserData } = useContext(UserContext);

  const handleSubmit = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        if (data.user) {
          setError("");
          console.log("Success");

          setUser(data.user);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.code == "auth/invalid-email") {
          setError("Email is in bad format");
        }
        if (error.code == "auth/user-not-found") {
          setError("This email does not exists ");
        }
        if (error.code == "auth/wrong-password") {
          setError("Your password is incorrect");
        }
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
        <ActivityIndicator size="large" animating={loading} />
        <View style={styles.formInputContainer}>
          <View style={styles.formSubContainer}>
            <View>
              <Text style={{ color: "red", margin: 2 }}>
                {error ? error.toString() : ""}
              </Text>
              <AppTextInput
                placeholder="Phone number, username or Email"
                keyboardtype="email-address"
                onchange={(email) => setEmail(email)}
                value={email}
              />
            </View>
            <PasswordInput
              onchange={(password) => setPassword(password)}
              value={password}
            />

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
