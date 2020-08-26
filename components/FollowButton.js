import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "./AppButton";
import AuthContext from "../AuthContext/Context";
import { firestore } from "firebase";
import UserContext from "../UserContext/Context";

export default function FollowButton({ useremail }) {
  const { user } = useContext(AuthContext);
  const { userData, setUserData } = useContext(UserContext);

  const handleClick = () => {
    console.log(useremail);
    firestore()
      .collection("user")
      .doc(user.email)
      .update({
        following: firestore.FieldValue.arrayUnion(useremail),
      })
      .then(() => {
        firestore()
          .collection("user")
          .doc(useremail)
          .update({
            followers: firestore.FieldValue.arrayUnion(user.email),
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
      name="Follow"
      styleprop={{ width: "50%" }}
      onSubmit={handleClick}
    />
  );
}

const styles = StyleSheet.create({});
