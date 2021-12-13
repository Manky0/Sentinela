import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Touchable,
} from "react-native";

const options = ["bicycle", "car", "traffic", "trash", "tree", "water"];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ComplaintTypePicker = (props) => {
  const onPressItem = (option) => {
    props.changeModalVisibility(false);
    props.setData(option);
  };

  const option = options.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={styles.container}
    >
      <View style={[styles.modal, { width: width - 20, height: height / 2 }]}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export { ComplaintTypePicker };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#48494b",
    borderRadius: 10,
  },
  option: {
    alignItems: "center",
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
