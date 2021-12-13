import React from "react";
import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { UserDataContext } from "../userdata-context";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <UserDataContext.Consumer>
        {({ name }) => (
          <View style={styles.userInfoSection}>
            <Title style={styles.title}>Olá, {name.split(" ")[0]}</Title>
          </View>
        )}
      </UserDataContext.Consumer>
      <TouchableOpacity
        onPress={() => navigation.navigate("NewComplaintScreen_region")}
        style={styles.newComplaint}
      >
        <Text style={styles.textComplaint}>Registrar um novo problema</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    alignItems: "flex-start",
    marginTop: 70,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 15,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  newComplaint: {
    height: "15%",
    width: "95%",
    backgroundColor: "#48494b",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textComplaint: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
