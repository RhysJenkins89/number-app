import React from "react";
import {Text, StyleSheet, Platform} from "react-native";
import Colours from "../constants/colours";

const TitleText = (props) => {
  return <Text style={{...styles.title, ...props.style}}>{props.children}</Text>
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: Platform.OS == "ios" ? Colours.primary : "black" 
  }
});

export default TitleText;