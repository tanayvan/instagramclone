import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import PostCard from "../components/PostCard";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
export default function HomeScreen() {
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
        <FlatList
          data={DATA}
          renderItem={() => <PostCard />}
          keyExtractor={(item) => item.id}
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
