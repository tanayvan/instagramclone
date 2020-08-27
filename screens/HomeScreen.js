import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Octicons, Entypo } from "@expo/vector-icons";

import colors from "../config/colors";
import PostCard from "../components/PostCard";
import AuthContext from "../AuthContext/Context";
import Screen from "../components/Screen";
import { storage, firestore, auth } from "firebase";
import UserContext from "../UserContext/Context";
import Modal from "react-native-modalbox";
import ProfileCounters from "../components/ProfileCounters";
import AppButton from "../components/AppButton";

export default function HomeScreen() {
  const { user, setUser } = useContext(AuthContext);
  const { userData, setUserdata } = useContext(UserContext);
  const [profile, setProfile] = useState();
  const [modalVisible, setModalVisible] = useState(false);
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
        .then(async () => {
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

  const getModal = () => {
    return (
      <Modal
        entry="bottom"
        backdropPressToClose={true}
        isOpen={modalVisible}
        style={styles.modalBox}
        onClosed={() => setModalVisible(false)}
      >
        <View style={styles.ModalContainer}>
          <Entypo
            name="chevron-thin-down"
            size={30}
            color="white"
            style={{ margin: 2 }}
          />
          {profile && (
            <Image
              source={{ uri: profile }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                marginTop: 25,
              }}
            />
          )}
          <Text style={styles.text}>{userData.name}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <ProfileCounters
              numbers={userData.following.length}
              value="Following"
            />
            <ProfileCounters
              numbers={userData.followers.length}
              value="Followers"
            />
          </View>
          <AppButton
            name="Sign Out"
            styleprop={{ backgroundColor: "tomato", width: "80%" }}
            onSubmit={() => {
              auth().signOut();
              setUser("");
            }}
          />
        </View>
      </Modal>
    );
  };
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <SimpleLineIcons name="camera" size={34} color="white" />
          {profile ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={{ uri: profile }}
                style={{ height: 40, width: 40, borderRadius: 25 }}
              />
            </TouchableOpacity>
          ) : (
            <View style={{ height: 40, width: 40, backgroundColor: "grey" }} />
          )}
          <Octicons name="settings" size={34} color="white" />
        </View>
        {getModal()}
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
    fontSize: 30,
    backgroundColor: "transparent",
    color: "white",
  },
  modalBox: {
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
    height: Dimensions.get("screen").height * 0.8,
    width: Dimensions.get("screen").width,
    backgroundColor: colors.dark,
    borderRadius: 25,
  },
  ModalContainer: {
    display: "flex",
    alignItems: "center",
  },
});
