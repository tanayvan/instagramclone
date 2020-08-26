import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Image,
  Dimensions,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import colors from "../config/colors";
import PostCard from "../components/PostCard";
import AuthContext from "../AuthContext/Context";
import Screen from "../components/Screen";
import { storage, firestore } from "firebase";
import UserContext from "../UserContext/Context";

export default function HomeScreen() {
  const { user, setUser } = useContext(AuthContext);
  const { userData, setUserdata } = useContext(UserContext);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);

  const loadPostData = () => {
    const postData = [];
    userData.following.forEach(async (user) => {
      console.log("User", user);
      await firestore()
        .collection("posts")
        .where("email", "==", user)
        .get()
        .then((querySnapshot) => {
          console.log("Total users: ", querySnapshot.size);

          querySnapshot.forEach((documentSnapshot) => {
            console.log(
              "User ID: ",
              documentSnapshot.id,
              postData.push(documentSnapshot.data())
            );
          });
        })
        .then(() => {
          setPostData(postData);
        });
    });
  };

  useEffect(() => {
    const load = async () => {
      const url = await storage()
        .ref(`/profile/${user.email}`)
        .getDownloadURL();
      setProfile(url);
    };
    load();

    loadPostData();
    console.log("HEllo", userData);
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <SimpleLineIcons name="camera" size={34} color="white" />
          {profile ? (
            <Image
              source={{ uri: profile }}
              style={{ height: 40, width: 40, borderRadius: 25 }}
            />
          ) : (
            <View style={{ height: 40, width: 40, backgroundColor: "grey" }} />
          )}
          <Octicons name="settings" size={34} color="white" />
        </View>
        <FlatList
          data={postData}
          renderItem={({ item }) => (
            <PostCard url={item.url} name={item.email.split("@")[0]} />
          )}
          keyExtractor={(item, index) => String(index)}
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            loadPostData();
            setLoading(false);
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
  },
  header: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
});
