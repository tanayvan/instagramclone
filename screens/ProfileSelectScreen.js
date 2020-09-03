import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { storage, firestore } from "firebase";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

export default function ProfileSelectScreen({ route, navigation }) {
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(false);

  const ref = storage().ref(`/profile/${route.params.userToken.email}`);

  const handleSkip = () => {
    navigation.navigate("Login");
  };
  const handlePhoto = () => {
    console.log("Clicked");
    setLoading(true);

    ImagePicker.requestCameraRollPermissionsAsync();
    ImagePicker.launchImageLibraryAsync().then(async (image) => {
      setPhoto(image);
      const response = await fetch(image.uri);
      const blob = await response.blob();
      ref.put(blob).then(async () => {
        setLoading(false);
        const url = await ref.getDownloadURL();

        await firestore()
          .collection("user")
          .doc(route.params.userToken.email)
          .update({
            url: url,
          });
        navigation.navigate("Login");
      });
    });
  };
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          {photo ? (
            <Image
              source={{ uri: photo.uri }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
              }}
            />
          ) : (
            <AntDesign name="camerao" size={150} color="white" />
          )}
          <ActivityIndicator size="large" animating={loading} />
          <AppButton name="Add a Profile Photo" onSubmit={handlePhoto} />
          <Text style={styles.text} onPress={handleSkip}>
            You can skip this step
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  profileContainer: {
    marginTop: 250,
    alignItems: "center",
    width: "90%",
  },
  text: {
    marginTop: 20,
    color: colors.secondary,
  },
});
