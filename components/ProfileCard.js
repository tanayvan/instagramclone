import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import colors from "../config/colors";
import AppButton from "./AppButton";
import ProfileCounters from "./ProfileCounters";

const { width } = Dimensions.get("screen");

const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;

export default function ProfileCard({ data, handleClick, onClick }) {
  return (
    <View style={styles.profileCard}>
      <Image
        source={{ uri: data.url }}
        style={{ height: 100, width: 100, borderRadius: 50 }}
      />
      <Text style={styles.text} onPress={onClick}>
        {data.name}
      </Text>

      <AppButton
        name="Follow"
        styleprop={{ width: "50%" }}
        onSubmit={handleClick}
      />
      <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
        <ProfileCounters numbers={data.following.length} value="Following" />
        <ProfileCounters numbers={data.followers.length} value="Followers" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
    backgroundColor: colors.dark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 15,
    borderWidth: 0.3,
    borderColor: colors.secondary,
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
  },
});
