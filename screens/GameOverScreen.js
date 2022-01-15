import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import Colours from "../constants/colours";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The game is over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: "https://source.unsplash.com/featured/?mountain" }}
            fadeDuration={500}
          />
        </View>
        <View style={styles.textContainer}>
          <BodyText style={styles.text}>Your phone needed <Text style={styles.highlight}>{props.howManyRounds}</Text> guesses to get your number, <Text style={styles.highlight}>{props.playerNumber}.</Text></BodyText>
        </View>
        <MainButton title="Play again." onPress={props.onNewGame} />
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20
  },
  imageContainer: {
    width: deviceWidth * .7,
    height: deviceWidth * .7,
    borderRadius: deviceWidth * .7 / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: deviceHeight / 20
  },
  image: {
    width: Dimensions.get("window").width * .7,
    height: Dimensions.get("window").height * .7
  },
  textContainer: {
    width: "75%",
    marginVertical: deviceHeight / 40
  },
  text: {
    fontSize: deviceHeight < 400 ? 16 : 20,
    textAlign: "center"
  },
  highlight: {
    color: Colours.primary
  }
});

export default GameOverScreen;
