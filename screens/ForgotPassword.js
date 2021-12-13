import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");

  const handlePasswordResetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Tudo certo :D",
          "E-mail enviado, verifique sua caixa de entrada!",
          [
            {
              text: "voltar",
              onPress: () => navigation.navigate("SignInScreen"),
            },
          ]
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
        <Text style={styles.text_footer}>E-mail</Text>
        <View style={styles.action}>
          <AntDesign name="mail" color="#05375a" size={20} />
          <TextInput
            placeholder="Seu endereço de email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          {/*<Feather name="check-circle" color="green" size={20} />*/}
        </View>

        <View style={[styles.button, { marginBottom: 50 }]}>
          <TouchableOpacity onPress={() => handlePasswordResetEmail()}>
            <LinearGradient
              colors={["#48494b", "#48494b"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Enviar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={{ width: 60, alignSelf: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.textSignUp]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const { height } = Dimensions.get("screen");
const heigh_logo = height * 0.13;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48494b",
  },
  header: {
    marginTop: 35,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logo: {
    width: height * 0.2,
    height: height * 0.2,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 32,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    marginTop: 10,
  },
  action: {
    flexDirection: "row",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    justifyContent: "center",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: 270,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  textForgotPassword: {
    color: "#05375a",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  textSignUp: {
    alignSelf: "center",
    color: "#05375a",
  },
});
