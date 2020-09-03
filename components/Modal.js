import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Modal from "react-native-modalbox";
import { Entypo } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";

import UserContext from "../UserContext/Context";
import ProfileCounters from "./ProfileCounters";
import AppButton from "./AppButton";
import { firestore, auth } from "firebase";
import AuthContext from "../AuthContext/Context";
import colors from "../config/colors";

export default function ModalBox({ modalVisible, profile, setModalVisible }) {
  const { userData, setUserData } = useContext(UserContext);
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    const loadData = async () => {
      await firestore()
        .collection("user")
        .doc(user.email)
        .get()
        .then((documentSnapshot) => {
          console.log("User exists: ", documentSnapshot.exists);
          if (documentSnapshot.exists) {
            console.log("User data: ", documentSnapshot.data());
            setUserData(documentSnapshot.data());
          }
        });
    };
    loadData();
  }, []);
  return (
    <Modal
      entry="bottom"
      backdropPressToClose={true}
      isOpen={modalVisible}
      style={styles.modalBox}
      onClosed={() => setModalVisible(false)}
      useNativeDriver={true}
      backButtonClose={true}
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
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              marginTop: 25,
            }}
            {...{ preview: profile, uri: profile }}
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
}

const styles = StyleSheet.create({
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
