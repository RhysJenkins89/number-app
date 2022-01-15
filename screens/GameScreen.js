import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItems = (value, numOfRound) => {
  return (
    <View key={value} style={styles.listItem}>
      <BodyText>Round: {numOfRound + 1}</BodyText>
      <BodyText>Guess: {value}</BodyText>
    </View>
  )
}

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get("window").width); 
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get("window").height); 

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get("window").height);
      setAvailableDeviceWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout)
    }
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      direction === "lower" && currentGuess < props.userChoice
      ||
      direction === "higher" && currentGuess > props.userChoice
    ) {
      Alert.alert("Cheeky!", "You have to play fair.", [{ text: "Okay.", style: "destructive" }]);
      return;
    } else {
      if (direction === "lower") {
        currentHigh.current = currentGuess;
      } else {
        currentLow.current = currentGuess + 1;
      }
      const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
      setCurrentGuess(nextNumber);
      setPastGuesses(currentPastGuesses => [...currentPastGuesses, nextNumber.toString()]);
    }
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's guess:</Text>
        <View style={[styles.controls, {width: availableDeviceWidth / 2}]}>
          <MainButton title="Lower" onPress={nextGuessHandler.bind(this, "lower")} />
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton title="Higher" onPress={nextGuessHandler.bind(this, "higher")} />
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItems(guess, index))}
          </ScrollView>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.screen}>
        <Text>Opponent's guess:</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.container}>
          <Text style={styles.text}>My number is</Text>
          <View style={styles.buttonContainer}>
            <MainButton title="Lower" onPress={nextGuessHandler.bind(this, "lower")} />
            <MainButton title="Higher" onPress={nextGuessHandler.bind(this, "higher")} />
          </View>
          <Text style={styles.text}>than {currentGuess}.</Text>
        </Card>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItems(guess, index))}
          </ScrollView>
        </View>
      </View>
    )  
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  container: {
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 300,
    maxWidth: "80%",
    marginBottom: 15
  },
  text: {
    fontSize: 18
  },
  listContainer: {
    flex: 1,
    width: "50%",
    marginTop: 20
  },
  list: {
    flexGrow: 1
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    alignItems: "center"
  }
});

export default GameScreen;