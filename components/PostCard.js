import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
} from "react-native";

import { FontAwesome, Fontisto } from "@expo/vector-icons";
import ScalableImage from "react-native-scalable-image";

import colors from "../config/colors";
import { PinchGestureHandler, State } from "react-native-gesture-handler";

const height = Dimensions.get("screen").height * 0.64;

const width = Dimensions.get("screen").width;

export default function PostCard({ url, name }) {
  const scale = new Animated.Value(1);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.profile} source={{ uri: url }} />
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
        <PinchGestureHandler
          onGestureEvent={Animated.event([{ nativeEvent: { scale: scale } }], {
            useNativeDriver: true,
          })}
          onHandlerStateChange={(event) => {
            if (event.nativeEvent.oldState === State.ACTIVE) {
              Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                bounciness: 1,
              }).start();
            }
          }}
        >
          <Animated.Image
            source={{ uri: url }}
            style={{
              width: width,
              height: width,
              transform: [{ scale: scale }],
              zIndex: 5,
            }}
          />
        </PinchGestureHandler>
      </View>
      <View style={styles.iconContainer}>
        <FontAwesome
          name="heart-o"
          size={30}
          color="white"
          style={{ marginHorizontal: 10 }}
        />
        <Fontisto
          name="share-a"
          size={30}
          color="white"
          style={{ marginHorizontal: 10 }}
        />
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
    borderRadius: 10,

    width: width,
  },

  headerContainer: {
    margin: 5,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
  profile: { height: 35, width: 35, borderRadius: 50 },
  post: {
    marginVertical: 10,
    height: height * 0.8,
    borderRadius: 10,
    width: "95%",
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
