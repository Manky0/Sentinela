import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const NewComplaintScreen_region = ({ navigation }) => {
  const [region, setRegion] = useState(null);

  // GPS
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização foi negada!");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0025,
      });
    })();
  }, []);
  if (errorMsg) alert(errorMsg);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={location}
        onRegionChangeComplete={(region) => {
          setRegion(region);
        }}
        showsUserLocation
      ></MapView>
      <View style={styles.markerFixed}>
        <Image
          style={styles.marker}
          source={require("../assets/images/mapMarker.png")}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NewComplaintScreen_details", region)
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewComplaintScreen_region;

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
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
