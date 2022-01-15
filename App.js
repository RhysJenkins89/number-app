import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Header from "./components/Header";
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (  
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  };

  const newGameHandler = () => {
    setGuessRounds([]);
    setUserNumber(0);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }

  if (guessRounds > 0) {
    content = <GameOverScreen howManyRounds={guessRounds} playerNumber={userNumber} onNewGame={newGameHandler}/>
  }

  return (
    <View style={styles.screen}>
      <Header title="It's a numbers game." />
      {content}
    </View> 
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1 
  }
});