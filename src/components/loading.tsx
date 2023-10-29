/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
const Back = require('../devdata/assets/background.png');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const LoadingScreen = ({navigation}: HomeProps) => {
  // const storeProgressData = async (data) => {
  //   try {
  //     await AsyncStorage.setItem('progress', JSON.stringify(data));
  //   } catch (error) {
  //     console.error('Error saving progress data:', error);
  //   }
  // };
  // useEffect(() => {
  //   const loadProgressData = async () => {
  //     try {
  //       // Load the progress data from AsyncStorage
  //       const storedProgress = await AsyncStorage.getItem('progress');
  //       if (storedProgress) {
  //         const progressData = JSON.parse(storedProgress);

  //         // Navigate to the Home screen with the loaded data
  //         setTimeout(() => {
  //           navigation.replace('Home', {
  //             totalcount: progressData.totalcount,
  //             beadcount: progressData.beadcount,
  //             target: progressData.target,
  //             mala: progressData.mala,
  //             esttime: progressData.esttime,
  //             elapsedtime: progressData.elapsedtime,
  //             languageindex: progressData.languageindex,
  //             malatime: progressData.malatime,
  //           });
  //         }, 2000);
  //       } else {
  //         storeProgressData({
  //           target: target,
  //           totalcount: totalcount,
  //           mala: mala,
  //           beadcount: beadcount,
  //           esttime: esttime,
  //           elapsedtime: elapsedtime,
  //           languageindex: i,
  //           malatime: malatime,
  //         });
  //         loadProgressData();
  //       }
  //     } catch (error) {
  //       console.error('Error loading progress data:', error);
  //     }
  //   };

  //   // Call the function to load progress data
  //   loadProgressData();
  // }, [navigation]);
  useEffect(() => {
    const timer = setTimeout(() => {
      // Replace the 'Loading' screen with the 'Home' screen
      navigation.replace('Home', {languageindex: 0});
    }, 2000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={Back} style={styles.img2} />

      <Text style={styles.appby}>A Product of ABCOM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b78ee',
  },
  img2: {
    position: 'absolute',
    top: -10,
  },
  appby: {
    position: 'absolute',
    top: 120,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
});

export default LoadingScreen;
