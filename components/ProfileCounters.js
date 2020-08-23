import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileCounters({ value, numbers }) {
  return (
    <View style={{ marginHorizontal: 15 }}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {numbers}
      </Text>
      <Text style={{ color: "white", textAlign: "center" }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
