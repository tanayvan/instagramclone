import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";

import Screen from "../components/Screen";

export default function PhotoSelectScreen({ navigation }) {
  const [photo, setPhoto] = useState([]);
  const [assetId, setAssetId] = useState("");
  var allphotos = [];

  const handlePhoto = (photoUrl) => {
    console.log(photoUrl);
    navigation.navigate("uploadFinal", { url: photoUrl });
  };

  useEffect(() => {
    MediaLibrary.requestPermissionsAsync();
    MediaLibrary.getPermissionsAsync();
    MediaLibrary.getAssetsAsync({ mediaType: "photo", first: 100 })
      .then((data) => {
        setAssetId(data.endCursor);
        data.assets.map((item) => {
          allphotos.push(item);
        });
      })
      .finally(() => {
        setPhoto(allphotos);
      });
  }, []);
  return (
    <Screen>
      <FlatList
        data={photo}
        style={{
          flex: 1,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              height: 300,
              width: "50%",
            }}
            onPress={() => {
              handlePhoto(item.uri);
            }}
          >
            <Image
              source={{ uri: item.uri }}
              style={{
                height: 300,
                width: "100%",
              }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
