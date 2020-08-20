import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { storage, firestore } from "firebase";

import Screen from "../components/Screen";
import AuthContext from "../AuthContext/Context";

export default function UploadFinalScreen({ route, navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");

  //For creating Unique Filename For Posts
  const date = Date.now();
  const photoName = `${user.email}${date}`;
  const ref = storage().ref(`/posts/${user.email}/${photoName}/`);

  const handlePost = async () => {
    setLoading(true);
    const response = await fetch(route.params.url);
    const blob = await response.blob();
    await ref.put(blob);
    const url = await ref.getDownloadURL();
    firestore()
      .collection("posts")
      .add({
        url: url,
        caption: caption,
        email: user.email,
      })
      .then(() => {
        console.log("User added!");
        navigation.navigate("PhotoSelectScreen");
      });
  };
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={{ height: 200, width: 150 }}>
            <Image
              source={{ uri: route.params.url }}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
        </View>
        <View style={styles.captionContainer}>
          <ActivityIndicator animating={loading} size={"large"} />
          <TextInput
            placeholder="Enter Your Caption"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "white",
              marginBottom: 10,
              color: "white",
            }}
            onChangeText={(text) => {
              setCaption(text);
            }}
          />
          <Button title="Post" onPress={handlePost} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  captionContainer: {
    width: 200,
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
