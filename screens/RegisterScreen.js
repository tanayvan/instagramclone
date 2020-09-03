import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth, firestore } from "firebase";

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

          <AppButton
            name="Next"
            onSubmit={handleSubmit}
            styleprop={{ marginTop: 15 }}
          />
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ color: "white", marginTop: 30 }}>
            Have an account?
          </Text>
          <Text
            style={{
              color: colors.secondary,
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Sign in
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: { flexDirection: "row", marginTop: 10 },

  subContainer: {
    marginTop: 25,
    width: Dimensions.get("screen").width * 0.9,
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
