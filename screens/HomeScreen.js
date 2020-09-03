import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import PostCard from "../components/PostCard";
import AuthContext from "../AuthContext/Context";
import Screen from "../components/Screen";
import { storage, firestore, auth } from "firebase";
import UserContext from "../UserContext/Context";
import ModalBox from "../components/Modal";

export default function HomeScreen() {
  const { user, setUser } = useContext(AuthContext);
  const { userData, setUserdata } = useContext(UserContext);
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPostData = async () => {
    const postData = [];

    await firestore()
      .collection("posts")
      .where("email", "in", userData.following)
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.data());
          console.log(documentSnapshot.data());
          postData.push(documentSnapshot.data());
        });
      })
      .then(async () => {
        setPostData(postData);
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
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <SimpleLineIcons name="camera" size={34} color="white" />
          {profile !== "" ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                style={{ height: 40, width: 40, borderRadius: 25 }}
                {...{ preview: profile, uri: profile }}
              />
            </TouchableOpacity>
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
        <ModalBox
          modalVisible={modalVisible}
          profile={profile}
          setModalVisible={setModalVisible}
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
    fontSize: 30,
    backgroundColor: "transparent",
    color: "white",
  },
});
