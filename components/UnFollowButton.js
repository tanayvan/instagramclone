import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { firestore } from "firebase";

import AppButton from "./AppButton";
import AuthContext from "../AuthContext/Context";
import UserContext from "../UserContext/Context";

export default function UnFollowButton({ useremail }) {
  const { user } = useContext(AuthContext);
  const { userData, setUserData } = useContext(UserContext);
  const handleClick = () => {
    console.log(useremail);
    firestore()
      .collection("user")
      .doc(user.email)
      .update({
        following: firestore.FieldValue.arrayRemove(useremail),
      })
      .then(() => {
        firestore()
          .collection("user")
          .doc(useremail)
          .update({
            followers: firestore.FieldValue.arrayRemove(user.email),
          });
      })
      .then(() => {
        console.log("User updated!");
        firestore()
          .collection("user")
          .doc(user.email)
          .get()
          .then((documentSnapshot) => {
            console.log("User exists: ", documentSnapshot.exists);

            if (documentSnapshot.exists) {
              console.log("User data: ", documentSnapshot.data());
              setUserData(documentSnapshot.data());
              console.log(documentSnapshot.data());
            }
          });
      });
  };
  return (
    <AppButton
      name="UnFollow"
      styleprop={{ width: "50%" }}
      onSubmit={handleClick}
    />
  );
}

const styles = StyleSheet.create({});
