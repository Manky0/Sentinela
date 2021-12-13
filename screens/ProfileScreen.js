import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../auth-context";
import { UserDataContext } from "../userdata-context";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { signedOut } = React.useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        signedOut();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserDataContext.Consumer>
        {({ name }) => (
          <View style={styles.userInfoSection}>
            <Avatar.Text
              label={
                name.split(" ")[0].charAt(0) +
                (name.split(" ")[1] ? name.split(" ")[1].charAt(0) : "")
              }
              size={80}
              style={{ marginBottom: 10 }}
            />
            <Title style={styles.title}>{name}</Title>
            {/*<Caption style={styles.caption}>@manky</Caption>*/}
          </View>
        )}
      </UserDataContext.Consumer>
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <FontAwesome name="user-o" color="grey" size={25} />
            <Text style={styles.menuItemText}>Meus Dados (wip)</Text>
          </View>
        </TouchableRipple>

        <View style={styles.action} />
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Feather name="settings" color="grey" size={25} />
            <Text style={styles.menuItemText}>Configurações (wip)</Text>
          </View>
        </TouchableRipple>

        <View style={styles.action} />
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Feather name="info" color="grey" size={25} />
            <Text style={styles.menuItemText}>Informações (wip)</Text>
          </View>
        </TouchableRipple>

        <View style={styles.action} />
        <TouchableRipple onPress={() => handleSignOut()}>
          <View style={styles.menuItem}>
            <Ionicons name="md-exit-outline" color="grey" size={25} />
            <Text style={[styles.menuItemText, { color: "red" }]}>Sair</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    alignItems: "center",
    marginTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: "90%",
    alignSelf: "center",
  },
});
