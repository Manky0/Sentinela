import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./screens/RootStackScreen";

import { AuthContext } from "./auth-context";
import { UserDataContext } from "./userdata-context";

import { auth, usersCollectionRef } from "./firebase";
import { getDocs, where, query } from "firebase/firestore";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [userData, setUserData] = useState({
    name: "......",
  });

  const authContext = React.useMemo(() => {
    return {
      signedIn: () => {
        const getUser = async () => {
          const q = query(
            usersCollectionRef,
            where("id", "==", auth.currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserData({ ...userData, name: doc.data().name });
            //console.log({ ...data, name: doc.data().name });
          });
        };
        getUser();
        setIsLoading(false);
        setUserToken(auth.currentUser);
      },
      signedOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  });

  return (
    <AuthContext.Provider value={authContext}>
      <UserDataContext.Provider value={userData}>
        <NavigationContainer>
          <RootStackScreen userToken={userToken} isLoading={isLoading} />
        </NavigationContainer>
      </UserDataContext.Provider>
    </AuthContext.Provider>
  );
}
