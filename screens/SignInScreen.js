import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../auth-context";

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    secureTextEntry: true,
  });

  const { signedIn } = React.useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        signedIn();
      }
    });
    return unsubscribe;
  }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.message));
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
        <KeyboardAvoidingView style={styles.action} behavior="padding">
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Seu endereço de email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setData({ ...data, email: text })}
          />
          {/*<Feather name="check-circle" color="green" size={20} />*/}
        </KeyboardAvoidingView>
        <Text style={[styles.text_footer, { marginTop: 30 }]}>Senha</Text>
        <KeyboardAvoidingView style={styles.action} behavior="padding">
          <Feather name="lock" color="#05375a" size={19} />
          <TextInput
            placeholder="Sua senha"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setData({ ...data, password: text })}
          />
          <TouchableOpacity
            onPress={() =>
              setData({ ...data, secureTextEntry: !data.secureTextEntry })
            }
          >
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#48494b" size={20} />
            ) : (
              <Feather name="eye" color="#48494b" size={20} />
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.textForgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => handleSignIn()}>
            <LinearGradient
              colors={["#48494b", "#48494b"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Entrar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={styles.textSignUp}>
            <Text>Ainda não tem uma conta?</Text>
            <Text style={{ fontWeight: "bold" }}> Clique aqui.</Text>
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
          <View style={[styles.action]}>
            <View
              style={[
                styles.action,
                {
                  width: "31%",
                  position: "absolute",
                  marginTop: 0,
                  borderBottomColor: "white",
                },
              ]}
            />
            <Text style={[styles.textSignUp, { position: "absolute" }]}>
              Ou entrar com...
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity onPress={() => alert("num pod D:")}>
              <Image
                source={require("../assets/images/google_logo.png")}
                style={[
                  styles.logoLogin,
                  { marginTop: 20, alignSelf: "center" },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("num pod D:")}>
              <Image
                source={require("../assets/images/facebook_logo.png")}
                style={[
                  styles.logoLogin,
                  { marginTop: 20, alignSelf: "center" },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const { height } = Dimensions.get("screen");

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
  logoLogin: {
    width: height * 0.048,
    height: height * 0.048,
  },
  footer: {
    flex: 3.5,
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
    marginTop: 30,
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
    marginTop: 20,
    color: "#05375a",
  },
});
