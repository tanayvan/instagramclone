import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import LottieView from "lottie-react-native";

import Screen from "../components/Screen";

import { firestore, storage } from "firebase";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import ProfileCounters from "../components/ProfileCounters";
import ProfileCard from "../components/ProfileCard";
import Animated from "react-native-reanimated";
import AuthContext from "../AuthContext/Context";
import UserContext from "../UserContext/Context";
const { width, height } = Dimensions.get("screen");

const SPACING = 10;
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

export default function SearchScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(true);

  const { user, setUser } = useContext(AuthContext);
  const { userData, setUserData } = useContext(UserContext);

  const loadData = () => {
    firestore()
      .collection("user")
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);
        const users = [];
        querySnapshot.forEach(async (documentSnapshot) => {
          console.log(
            "User ID: ",
            documentSnapshot.id,
            documentSnapshot.data()
          );
          users.push(documentSnapshot.data());
        });
        setData(users);
        setLoading(false);
      })
      .then(async () => {
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
      });
  };
  useEffect(() => {
    loadData();
    setTimeout(() => {
      setAnimating(false);
    }, 3000);
  }, []);
  if (loading) {
    return (
      <Screen>
        <ActivityIndicator
          animating
          size={"large"}
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        />
      </Screen>
    );
  }
  return (
    <Screen>
      <View
        style={{
          marginTop: Dimensions.get("screen").height * 0.1,
        }}
      >
        <Text style={styles.text}>Discover People</Text>
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            if (item.email !== user.email) {
              return (
                <ProfileCard
                  data={item}
                  onClick={() => {
                    navigation.navigate("OtherUserProfile", {
                      email: item.email,
                    });
                  }}
                />
              );
            }
          }}
          keyExtractor={(_, index) => String(index)}
          horizontal
          refreshing={loading}
          onRefresh={() => {
            loadData();
          }}
        />
        {animating && (
          <LottieView
            source={require("../assets/911-swipe-left (1).json")}
            style={{ height: 200, width: 200, marginLeft: width * 0.12 }}
            autoPlay={true}
            duration={2000}
            onAnimationFinish={(data) => {
              setAnimating(false);
              console.log(data);
            }}
            // OR find more Lottie files @ https://lottiefiles.com/featured
            // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },
});
