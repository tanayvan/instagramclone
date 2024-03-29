import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { firestore, auth, storage } from "firebase";
import { Image } from "react-native-expo-image-cache";

import Screen from "./Screen";
import colors from "../config/colors";
import ProfileCounters from "./ProfileCounters";
import AuthContext from "../AuthContext/Context";
import AppButton from "./AppButton";
import UserContext from "../UserContext/Context";
import UnFollowButton from "./UnFollowButton";
import FollowButton from "./FollowButton";

export default function ProfileComponent({ email }) {
  const [photoData, setPhotoData] = useState([]);
  const [profile, setProfile] = useState("");
  const [metaData, setMetaData] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

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
  const loadUserData = async () => {
    firestore()
      .collection("user")
      .doc(email)
      .get()
      .then((documentSnapshot) => {
        setMetaData(documentSnapshot.data());
        setLoading(false);
      });
    const url = await storage().ref(`/profile/${email}`).getDownloadURL();
    setProfile(url);
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
            fontSize: 40,
            marginLeft: 25,
          }}
        >
          {metaData.name}
        </Text>
      </View>
      <View style={styles.profileContainer}>
        {profile ? (
          <Image style={styles.image} {...{ preview: profile, uri: profile }} />
        ) : (
          <View />
        )}
        <View
          style={{ width: "40%", position: "absolute", right: 50, top: 20 }}
        >
          {email === user.email ? (
            <AppButton
              name={"Sign Out"}
              styleprop={{ backgroundColor: "tomato" }}
              onSubmit={() => {
                auth().signOut();
                setUser("");
              }}
            />
          ) : userData.following.includes(email) ? (
            <UnFollowButton />
          ) : (
            <FollowButton useremail={email} />
          )}
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
            preview = item.url;
            uri = item.url;
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
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 20,
                    }}
                    {...{ preview, uri }}
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
