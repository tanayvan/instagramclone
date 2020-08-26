import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, SimpleLineIcons, Entypo } from "@expo/vector-icons";
import colors from "../config/colors";

const height = Dimensions.get("screen").height * 0.64;

const width = Dimensions.get("screen").width;
export default function PostCard({ url, name }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: url,
          }}
          style={styles.profile}
        />
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginLeft: 10,
            marginTop: 4,
            fontWeight: "700",
          }}
        >
          {name}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: url,
          }}
          style={styles.post}
        />
      </View>
      <View style={{ marginLeft: 15, marginVertical: 2 }}>
        <FontAwesome name="heart-o" size={30} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
  },
  container: {
    marginVertical: 5,
    backgroundColor: colors.dark,
    borderRadius: 15,
    height: height,
    width: width,
  },
  caption: { color: "white", marginTop: 10, marginLeft: 5, fontSize: 15 },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
  },
  headerContainer: {
    margin: 5,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  profile: { height: 35, width: 35, borderRadius: 50 },
  post: {
    marginVertical: 10,
    height: height * 0.8,
    borderRadius: 10,
    width: "99%",
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "700",
  },
});
