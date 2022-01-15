import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import TitleText from "./TitleText";
import Colours from "../constants/colours";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 110,
    paddingTop: 36,
    backgroundColor: Platform.OS == "android" ? Colours.primary : "white" ,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Platform.OS == "ios" ? "#ccc" : "transparent",
    borderBottomWidth: 2
  }
});

export default Header;