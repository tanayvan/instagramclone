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
        <Text style={styles.text}>tanay_van</Text>
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
        <Text style={styles.text}>Liked By 10</Text>
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
  container: { marginVertical: 10 },
  headerContainer: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { marginHorizontal: 10 },
  profile: { height: 35, width: 35, borderRadius: 50 },
  post: { height: 450, marginVertical: 10 },
  text: { color: "white", fontSize: 15, marginLeft: 10 },
});
