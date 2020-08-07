import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { auth } from "firebase";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AuthContext from "../AuthContext/Context";

export default function HomePage({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const handleSignout = () => {
    auth()
      .signOut()
      .then(() => {
        auth().signOut();
        setUser("");
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <Screen>
      <Text style={{ color: colors.white }}>Hello {user.displayName}</Text>
      <Button title="sign Out" onPress={handleSignout}></Button>
    </Screen>
  );
}

const styles = StyleSheet.create({});
