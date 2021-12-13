import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../firebase";
import { AuthContext } from "../auth-context";

const SplashScreen = ({ navigation }) => {
  const { signedIn } = React.useContext(AuthContext);
  React.useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser) signedIn();
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Bem-vindo ao Sentinela!</Text>
        <Text style={styles.text}>Crie uma conta ou entre como visitante.</Text>
        <View style={styles.bottom}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignInScreen")}
            >
              <LinearGradient
                colors={["#48494b", "#48494b"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Começar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const heigh_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48494b",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#ffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: heigh_logo,
    height: heigh_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "#48494b",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-start",
    bottom: 0,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
