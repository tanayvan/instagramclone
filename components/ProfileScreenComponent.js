import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import ProfileCounters from "./ProfileCounters";
import colors from "../config/colors";
import { firestore, auth } from "firebase";
import Screen from "./Screen";

export default function ProfileScreenComponent({ email }) {
  const [photoData, setPhotoData] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadImages();
    loadUserData();
  }, []);
  const loadUserData = () => {
    firestore()
      .collection("user")
      .doc(email)
      .get()
      .then((documentSnapshot) => {
        setMetaData(documentSnapshot.data());
        setLoading(false);
      });
  };
  const loadImages = () => {
    firestore()
      .collection("posts")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setPhotoData(data);

        setIsRefreshing(false);
      });
  };
  return loading ? (
    <ActivityIndicator
      animating={loading}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.dark,
      }}
      size={"large"}
    />
  ) : (
    <Screen>
      <View style={{ backgroundColor: colors.dark, height: "45%" }}>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: photoData[0] ? photoData[0].url : "" }}
            style={{ height: 100, width: 100, borderRadius: 40 }}
          />
          <ProfileCounters value={"Post"} numbers={photoData.length} />
          <ProfileCounters
            value={"Following"}
            numbers={metaData.following.length}
          />
          <ProfileCounters
            value={"Followers"}
            numbers={metaData.followers.length}
          />
        </View>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.text}>{metaData.name}</Text>
          <Text style={styles.text}>What a awesome day!</Text>
        </View>
        <View style={{ margin: 10, marginTop: 40 }}>
          <Button
            title="Follow"
            color="black"
            onPress={() => {
              auth().signOut();
            }}
          />
        </View>
      </View>

      <FlatList
        data={photoData}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <View
                style={{
                  height: 200,
                  width: Dimensions.get("window").width / 3,
                  margin: 1,
                }}
              >
                <Image
                  source={{ uri: item.url }}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.url}
        numColumns={3}
        refreshing={isRefreshing}
        onRefresh={() => {
          setIsRefreshing(true);
          loadImages();
          loadUserData();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    margin: 10,
  },
  headerContainer: {
    marginTop: 25,
    marginLeft: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  subHeaderContainer: {
    marginTop: 20,
    marginLeft: 25,
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    marginVertical: 10,
  },
});
