import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { auth, markersCollectionRef } from "../firebase.js";
import { getDocs } from "firebase/firestore";

const mapStyle = [
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const MapScreen = ({ navigation }) => {
  // GET DATA FROM FIRESTORE
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const getMarkers = async () => {
      const data = await getDocs(markersCollectionRef);
      setMarkers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getMarkers();
  }, []);

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

  // SCREEN
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        customMapStyle={mapStyle}
        style={styles.map}
        initialRegion={{
          latitude: -1.370685976942792,
          longitude: -48.45766173262925,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        region={location}
        showsUserLocation
      >
        {markers.map((marker) => {
          const markerImages = {
            bicycle: require("../assets/images/mapIcons/bicycle.png"),
            car: require("../assets/images/mapIcons/car.png"),
            traffic: require("../assets/images/mapIcons/traffic.png"),
            trash: require("../assets/images/mapIcons/trash.png"),
            tree: require("../assets/images/mapIcons/tree.png"),
            water: require("../assets/images/mapIcons/water.png"),
          };
          return (
            <Marker
              onPress={() => null}
              icon={markerImages[marker.type]}
              key={marker.id}
              coordinate={{
                latitude: marker.coords.latitude,
                longitude: marker.coords.longitude,
              }}
            >
              <Callout>
                <Text>Enviado por: {marker.user}</Text>
                <Text>{marker.description}</Text>
                <Text style={{ height: 200, position: "relative" }}>
                  <Image
                    resizeMode="cover"
                    style={{ width: 90, height: 90 }}
                    source={{ uri: marker.image }}
                  />
                </Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      {/*<View style={styles.bottom}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewMarkerScreen")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Novo</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default MapScreen;

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
    flex: 1,
    position: "absolute",
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
    backgroundColor: "gray",
  },
});
