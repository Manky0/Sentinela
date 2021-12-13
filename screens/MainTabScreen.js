import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import HomeScreen from "./HomeScreen";
import MapScreen from "./MapScreen";
import ProfileScreen from "./ProfileScreen";
import NewComplaintScreen_region from "./NewComplaintScreen_region";
import NewComplaintScreen_details from "./NewComplaintScreen_details";

const HomeStack = createStackNavigator();

const MapStack = createStackNavigator();
const MapStackScreen = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Mapa interativo",
        }}
      />
    </MapStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();
const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#48494b"
      barStyle={{ backgroundColor: "white" }}
      shifting={false}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Inicio (wip)",
          //tabBarColor: "green",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStackScreen}
        options={{
          tabBarLabel: "Mapa (wip)",
          tabBarIcon: ({ color }) => (
            <Feather name="map" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil (wip)",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={TabStack}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="NewComplaintScreen_region"
        component={NewComplaintScreen_region}
        options={{
          headerShown: true,
          headerTitleAlign: "left",
          title: "1. Selecione o local do problema",
        }}
      />
      <HomeStack.Screen
        name="NewComplaintScreen_details"
        component={NewComplaintScreen_details}
        options={{
          headerShown: true,
          headerTitleAlign: "left",
          title: "2. Detalhes do problema",
        }}
      />
    </HomeStack.Navigator>
  );
};

export default MainTabScreen;
