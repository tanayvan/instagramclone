import React, { useEffect, useContext, useState } from "react";

import ProfileScreenComponent from "../components/ProfileScreenComponent";
import AuthContext from "../AuthContext/Context";

export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);

  return <ProfileScreenComponent email={user.email} />;
}
