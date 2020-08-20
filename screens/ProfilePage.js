import React, { useEffect, useContext, useState } from "react";

import AuthContext from "../AuthContext/Context";
import ProfileComponent from "../components/ProfileComponent";

export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);

  return <ProfileComponent email={user.email} />;
}
