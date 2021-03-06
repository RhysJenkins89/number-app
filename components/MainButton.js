import React from "react"
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from "react-native";
import Colours from "../constants/colours";

const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={{...styles.button, ...props.style}}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      </ButtonComponent>
    </View>
  )
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden"
  },
  button: {
    backgroundColor: Colours.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 7
  }, 
  text: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18
  }
});

export default MainButton;