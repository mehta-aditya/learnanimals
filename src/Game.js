import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, Easing} from 'react-native';
import TopNav from './components/TopNav.js';
import { getChoicesFromDatabase } from './Database.js';

import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';

import {FontAwesome} from '@expo/vector-icons';
import { Asset } from "expo-asset";
import { SvgUri } from 'react-native-svg'
import { StatusBar } from 'expo-status-bar';

const initialButtonColors = ['#c7bbc9', '#c7bbc9', '#c7bbc9', '#c7bbc9'];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

//gives back the array for button colors
const changeButtonColors = (correctChoice, buttonClicked) => {
  let newColors = [...initialButtonColors];

  newColors[correctChoice] = '#32cd32';
  return newColors;
}

const Game = () => {
  const [choices, setChoices] = useState(null);
  const correctChoice = useRef(null);
  const [newImage, setNewImage] = useState(true);
  const [buttonColors, setButtonColors] = useState(initialButtonColors);
  const [shootConfetti, setShootConfetti] = useState(false);
  const screenBackground = useRef('#8eb69b');


  //change these things when a button is clicked
  function optionButtonClicked(buttonClicked) {
    //make the button clicked blue really quickly
    let blueButtons = [...initialButtonColors];
    blueButtons[buttonClicked] = '#1AA7EC';
    setButtonColors(blueButtons);
    //show the correct answers
    setTimeout(function(){

      //Show coin animation
      if (buttonClicked == correctChoice.current) {
        setShootConfetti(true);
      }
      else {
        screenBackground.current = 'red';
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Warning
        );
      }

    
      setButtonColors(changeButtonColors(correctChoice.current, buttonClicked));
      setTimeout(function(){
        //reset the animal
        setShootConfetti(false);
        screenBackground.current = '#8eb69b';
        setNewImage(true);
      }, 2500);      
    }, 1000)

  }

  //generate the new animals
  useEffect(() => {
    if (newImage) {
      getChoicesFromDatabase(1).then(resultSet => {
        setNewImage(false);
        setButtonColors(initialButtonColors);
        correctChoice.current = Math.floor(Math.random()*4);
        setChoices(resultSet.rows._array);
      });
    }
  }, [newImage]);

  return (
    <>
    {choices &&  
    <View style={[styles.container, {backgroundColor: screenBackground.current}]}>
      {/* Put status bar here so it can change color */}
      <TopNav bgColor={screenBackground.current}/>

      {/* Animal Image */}     
      <View style={styles.animalImage}>
        <Image
          source={{uri: ('https://drive.google.com/thumbnail?id='+choices[correctChoice.current].uri)}}
          style={{ width: 230, height: 140 }} 
          accessibilityLabel='Animal Image'
        />
      </View>

      {/*Cannon which will fire whenever shoot is true*/}
        {shootConfetti ? (
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
        ) : null}

      {/* Multiple Choice Buttons */} 
      <View style={styles.allButtons}>   
        <TouchableOpacity 
          style={[styles.choiceButton, {backgroundColor: buttonColors[0]}]}
          onPress={() => optionButtonClicked(0)}
          disabled={buttonColors != initialButtonColors}>

          <Text style={styles.buttonText}>{choices[0].animal}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.choiceButton, {backgroundColor: buttonColors[1]}]}
          onPress={() => optionButtonClicked(1)}
          disabled={buttonColors != initialButtonColors}>
          <Text style={styles.buttonText}>{choices[1].animal}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.choiceButton, {backgroundColor: buttonColors[2]}]}
          onPress={() => optionButtonClicked(2)}
          disabled={buttonColors != initialButtonColors}>
          <Text style={styles.buttonText}>{choices[2].animal}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.choiceButton, {backgroundColor: buttonColors[3]}]}
          onPress={() => optionButtonClicked(3)}
          disabled={buttonColors != initialButtonColors}>
          <Text style={styles.buttonText}>{choices[3].animal}</Text>
        </TouchableOpacity>
      </View> 
    </View>
    }

    {/* Get a better loading screen */}
    {!choices &&
      <View style={styles.container}>
        <Text>Loading ...</Text>
      </View>
    }
    </>
  );
};
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#8eb69b',
      alignItems: 'center',
      justifyContent: 'center',
    },
    allButtons: {
      bottom: 0,
      marginBottom: 20,
      marginTop: 10,
      position: 'relative'
    },
    choiceButton: {
      marginTop: 10,
      borderRadius: 10,
      width: 300,
      height: 100, 
      justifyContent: 'center', 
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 24,
      textWeight: 'bold',
    },
    animalImage: {
      position: 'relative',
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 3,
      textAlign: 'center',
      fontSize: 24,
      borderColor: 'black',
      borderWidth: 3,
      borderRadius: 6,
    },
    coinsvg: {
      position: 'absolute',
      top: -100,
      left: 0,
      zIndex: -1
    }
});
  
export default Game;