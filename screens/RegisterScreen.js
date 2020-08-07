import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "firebase";

import Screen from "../components/Screen";
import AppTextInput from "../components/TextInput";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

export default function RegisterScreen({ navigation }) {
  const [isNumber, setIsNumber] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleNumber = () => {
    setIsNumber(true);
    setIsEmail(false);
  };
  const handleEmail = () => {
    setIsNumber(false);
    setIsEmail(true);
  };
  const handleSubmit = () => {
    auth()
      .fetchSignInMethodsForEmail(email)
      .then((data) => {
        if (data.length > 0) {
          setError("Email Already exists");
        } else {
          navigation.navigate("Password", { email });
        }
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code == "auth/invalid-email") {
          setError("Email is in bad format");
        }
        if (error.code == "auth/network-request-failed") {
          setError("Network Error");
        }
      });
    console.log(email);

    //
  };
  return (
    <Screen>
      <View style={styles.container}>
        <AntDesign name="user" size={150} color="white" style={styles.icon} />
        <View style={styles.formContainer}>
          <TouchableOpacity onPress={handleNumber}>
            <View
              style={[
                styles.textContainer,
                isNumber && { borderBottomColor: "white" },
              ]}
            >
              <Text style={[styles.text, isNumber && { color: "white" }]}>
                Number
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEmail}>
            <View
              style={[
                styles.textContainer,
                isEmail && { borderBottomColor: "white" },
              ]}
            >
              <Text style={[styles.text, isEmail && { color: "white" }]}>
                Email
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <Text style={{ color: "red" }}>{error}</Text>
          <AppTextInput
            placeholder={isNumber ? "Enter your Number" : "Enter your Email"}
            keyboardtype={isNumber ? "number-pad" : "email-address"}
            onchange={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.subContainer}>
          <AppButton name="Next" onSubmit={handleSubmit} />
        </View>
        <View>
          <Text style={{ color: "white", marginTop: 30, textAlign: "center" }}>
            Have an account?
          </Text>
          <Text
            style={{
              color: colors.secondary,
              position: "absolute",
              top: 30,
              right: 65,
            }}
            onPress={() => {
              navigation.navigate("Login");
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
  container: {
    marginTop: 150,
    marginLeft: 20,
    justifyContent: "center",
    width: "85%",
  },
  formContainer: { flexDirection: "row", marginTop: 10 },
  icon: {
    marginLeft: 100,
  },
  subContainer: {
    marginLeft: 10,
    marginTop: 25,
  },
  text: {
    color: "grey",
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 50,
  },
  textContainer: {
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
