import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import ForgotPasswordScreen from "./ForgotPassword";
import MainTabScreen from "./MainTabScreen";

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const RootStackScreen = ({ userToken, isLoading }) => (
  <RootStack.Navigator>
    {userToken && !isLoading ? (
      <RootStack.Screen
        name="App"
        component={MainTabScreen}
        options={{ headerShown: false, animationTypeForReplace: "pop" }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{ headerShown: false, animationTypeForReplace: "pop" }}
      />
    )}
  </RootStack.Navigator>
);

export default RootStackScreen;
