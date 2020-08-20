import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList, Button, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import PostCard from "../components/PostCard";
import { auth, storage } from "firebase";
import AuthContext from "../AuthContext/Context";

export default function HomeScreen() {
  const { user, setUser } = useContext(AuthContext);
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Feather name="camera" size={25} color="white" style={styles.icon} />
          <Text style={styles.text}>Instagram</Text>
          <Feather
            name="message-square"
            size={25}
            color="white"
            style={{ position: "absolute", right: 5, margin: 5 }}
          />
        </View>

        <Button
          title="submit"
          onPress={() => {
            console.log(user);
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 50,
    backgroundColor: colors.dark,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { margin: 5 },
  text: { color: "white", fontSize: 25, marginHorizontal: 10 },
});
