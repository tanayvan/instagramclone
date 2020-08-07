import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { auth } from "firebase";
import PasswordInput from "../components/PasswordInput";
import Screen from "../components/Screen";
import AppTextInput from "../components/TextInput";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AuthContext from "../AuthContext/Context";

export default function PasswordScreen({ route, navigation }) {
  const { email } = route.params;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setError("");
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        data.user.updateProfile({ displayName: name });
        console.log(data.user.displayName);

        navigation.navigate("Profile", { userToken: data.user });
      })
      .catch((error) => {
        setLoading(false);
        if (error.code == "auth/invalid-email") {
          setError("Invalid Email");
        }
        if (error.code == "auth/email-already-in-use") {
          setError(" Email Already in Use");
        }
        if (error.code == "auth/weak-password") {
          setError(" Your password is weak");
        }
        console.log(error.code);
      });
  };
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.text}>Just One Step To Go</Text>
        <ActivityIndicator size="large" animating={loading} />
        <Text style={{ color: "red", margin: 2 }}>{error}</Text>

        <AppTextInput
          placeholder="Enter Your Name"
          onchange={(text) => setName(text)}
        />
        <PasswordInput onchange={(text) => setPassword(text)} />
        <AppButton name="Submit" onSubmit={handleSubmit} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    margin: 20,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    margin: 20,
    fontSize: 20,
  },
});
