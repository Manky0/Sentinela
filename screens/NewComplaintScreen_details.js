import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Platform,
} from "react-native";
import { ComplaintTypePicker } from "../components/ComplaintTypePicker.js";
import { GeoPoint, addDoc } from "@firebase/firestore";
import { markersCollectionRef, auth } from "../firebase.js";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";

const NewComplaintScreen_details = (region) => {
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [type, setType] = useState("car");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Desculpe, mas precisamos de sua permissão para que isto funcione!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      let newArray = [...image];
      newArray[index] = result.uri;
      setImage(newArray);
    }
  };

  const uploadImages = async () => {
    setUploading(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image[0], true);
      xhr.send(null);
    });

    const fileRef = ref(storage, new Date().toISOString());
    const snapshot = await uploadBytes(fileRef, blob);

    blob.close();
    //return await getDownloadURL(fileRef);
    createMarker(await getDownloadURL(fileRef));
  };

  const createMarker = async (imageURL) => {
    await addDoc(markersCollectionRef, {
      coords: new GeoPoint(
        region.route.params.latitude,
        region.route.params.longitude
      ),
      description: description,
      image: imageURL + ".png",
      type: type,
      user: auth.currentUser.uid,
      date: new Date(),
    });
    alert("Enviado com sucesso!");
    navigation.replace("HomeScreen");
  };

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };
  const setData = (option) => {
    setType(option);
  };

  const imagesData = [
    {
      id: "0",
      selected: true,
    },
    {
      id: "1",
      selected: false,
    },
    {
      id: "2",
      selected: false,
    },
    {
      id: "3",
      selected: false,
    },
    {
      id: "4",
      selected: false,
    },
  ];

  const renderImages = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.imagePicker,
          {
            marginLeft: item.id == 0 ? 0 : 20,
            alignItems: "center",
            //padding: 10,
          },
        ]}
        onPress={() => pickImage(item.id)}
      >
        <Image
          source={
            image[item.id] != null
              ? { uri: image[item.id] }
              : require("../assets/images/no_image.png")
          }
          style={{ width: "100%", height: "100%", borderRadius: 13 }}
        />
        {/*<Text>{item.title}</Text>*/}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Que tipo de problema?</Text>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            changeModalVisibility(true);
          }}
        >
          <Modal
            transparent={true}
            animationType="fade"
            visible={isModalVisible}
            onRequestClose={() => {
              changeModalVisibility(false);
            }}
          >
            <ComplaintTypePicker
              changeModalVisibility={changeModalVisibility}
              setData={setData}
            />
          </Modal>
          <Text style={styles.touchableText}>{type}</Text>
        </TouchableOpacity>
        <Text style={styles.inputText}>Dê mais detalhes sobre problema:</Text>
        <TextInput
          multiline={true}
          placeholder="Detalhes do problema..."
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
        />
        <Text style={styles.inputText}>
          Complete enviando até 5 imagens (wip, só a 1ª é enviada):
        </Text>
        <View style={{ height: 109 }}>
          <FlatList
            data={imagesData}
            renderItem={renderImages}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => uploadImages()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewComplaintScreen_details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  inputContainer: {
    width: "80%",
    height: "15%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 8,
    height: "100%",
    textAlign: "left",
    textAlignVertical: "top",
  },
  inputText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 15,
  },
  emptyImagePicker: {
    height: "100%",
    width: "30%",
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 8,
  },
  imagePicker: {
    height: 100,
    width: 100,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 8,
    borderColor: "#48494b",
    borderWidth: 1,
  },
  touchable: {
    backgroundColor: "#48494b",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 8,
  },
  touchableText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: "flex-end",
    bottom: 0,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  button: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "#48494b",
  },
});
