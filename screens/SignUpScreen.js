import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, usersCollectionRef } from "../firebase";
import { addDoc } from "@firebase/firestore";
import { AuthContext } from "../auth-context";

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const { signedIn } = React.useContext(AuthContext);

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      id: auth.currentUser.uid,
      name: data.name,
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        signedIn();
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        createUser();
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
        <Text style={styles.text_footer}>Nome</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Seu nome completo"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setData({ ...data, name: text })}
          />
          {/*<Feather name="check-circle" color="green" size={20} />*/}
        </View>
        <Text style={styles.text_footer}>E-mail</Text>
        <View style={styles.action}>
          <AntDesign name="mail" color="#05375a" size={20} />
          <TextInput
            placeholder="Seu endereço de email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setData({ ...data, email: text })}
          />
          {/*<Feather name="check-circle" color="green" size={20} />*/}
        </View>
        <Text style={styles.text_footer}>Senha</Text>
        <View style={styles.action}>
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
        </View>
        <Text style={styles.text_footer}>Confirme sua senha</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={19} />
          <TextInput
            placeholder="Repita sua senha"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setData({ ...data, confirmPassword: text })}
          />
          <TouchableOpacity
            onPress={() =>
              setData({
                ...data,
                confirm_secureTextEntry: !data.confirm_secureTextEntry,
              })
            }
          >
            {data.confirm_secureTextEntry ? (
              <Feather name="eye-off" color="#48494b" size={20} />
            ) : (
              <Feather name="eye" color="#48494b" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <View style={[styles.button, { marginBottom: 40 }]}>
            <TouchableOpacity
              onPress={() => {
                data.password == data.confirmPassword &&
                data.password !== "" &&
                data.confirmPassword !== ""
                  ? data.name !== ""
                    ? data.email !== ""
                      ? handleSignUp()
                      : alert("E-mail não pode estar vazio!")
                    : alert("Nome não pode estar vazio!")
                  : alert("Senha inválida!");
              }}
            >
              <LinearGradient
                colors={["#48494b", "#48494b"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Criar conta</Text>
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
    </View>
  );
};

export default SignUpScreen;

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
    paddingBottom: 15,
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
  bottom: {
    flex: 1,
    justifyContent: "space-evenly",
  },
});
