import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5, SimpleLineIcons, Entypo } from "@expo/vector-icons";

export default function PostCard() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri:
              "https://images.pexels.com/photos/4940300/pexels-photo-4940300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
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
          tanay_van
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              "https://images.pexels.com/photos/4940300/pexels-photo-4940300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          }}
          style={styles.post}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AntDesign name="hearto" size={24} color="white" style={styles.icon} />
        <FontAwesome5
          name="comment-alt"
          size={24}
          color="white"
          style={styles.icon}
        />
        <SimpleLineIcons
          name="paper-plane"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Entypo
          name="awareness-ribbon"
          size={24}
          color="black"
          size={24}
          color="white"
          style={{ position: "absolute", right: 3 }}
        />
      </View>
      <View>
        <Text style={styles.text}>700 likes </Text>
        <View style={styles.captionContainer}>
          <Text style={styles.text}>tanay_van </Text>
          <Text style={styles.caption}>Be the Change</Text>
        </View>
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
  container: { marginVertical: 5 },
  caption: { color: "white", marginTop: 10, marginLeft: 5, fontSize: 15 },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
  },
  headerContainer: {
    margin: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { marginHorizontal: 10 },
  profile: { height: 35, width: 35, borderRadius: 50 },
  post: { height: 450, marginVertical: 10 },
  text: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "700",
  },
});
