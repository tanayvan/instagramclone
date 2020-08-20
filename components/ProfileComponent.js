import React, { useState, useEffect } from "react";
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
import { firestore, auth } from "firebase";

import Screen from "./Screen";
import colors from "../config/colors";
import ProfileCounters from "./ProfileCounters";

export default function ProfileComponent({ email }) {
  const [photoData, setPhotoData] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadImages();
    loadUserData();
  }, []);
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
      <View>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 25,
            marginTop: 20,
          }}
        >
          My Profile
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 30,
          }}
        >
          Welcome Back !
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 40,
          }}
        >
          {metaData.name.split(" ")[0]}.
        </Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri:
              "https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg",
          }}
          style={styles.image}
        />
        <View
          style={{ width: "40%", position: "absolute", right: 50, top: 20 }}
        >
          <Button title="Edit Profile" color={colors.secondary} />
        </View>
        <View style={styles.metadataContainer}>
          <ProfileCounters numbers={photoData.length} value="Posts" />
          <ProfileCounters
            numbers={metaData.following.length}
            value="Following"
          />
          <ProfileCounters
            numbers={metaData.followers.length}
            value="Followers"
          />
        </View>
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 25,
            margin: 15,
          }}
        >
          My Posts
        </Text>
        <FlatList
          data={photoData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View
                  style={{
                    height: 200,
                    width: Dimensions.get("window").width / 3,

                    marginHorizontal: 35,
                    marginVertical: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 20,
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.url}
          numColumns={2}
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            loadImages();
            loadUserData();
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: "absolute",
    top: -35,
    left: 40,
  },
  metadataContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 90,
    marginLeft: 50,
  },
  profileContainer: {
    backgroundColor: colors.dark,
    position: "absolute",
    bottom: 0,
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textContainer: {
    marginLeft: 25,
    marginTop: 50,
  },
});
