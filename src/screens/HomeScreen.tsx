/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {Clock, Head} from '../components';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {lang} from '../devdata/constants/languages';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const Back = require('../devdata/assets/background.png');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation, route}: HomeProps) => {
  const i = route.params.languageindex;

  // useEffect(() => {
  //   const loadProgressData = async () => {
  //     try {
  //       // Load the progress data from AsyncStorage
  //       const storedProgress = await AsyncStorage.getItem('progress');
  //       if (storedProgress) {
  //         const progressData = JSON.parse(storedProgress);
  //         navigation.setParams({
  //           totalcount: progressData.totalcount,
  //           beadcount: progressData.beadcount,
  //           target: progressData.target,
  //           mala: progressData.mala,
  //           esttime: progressData.esttime,
  //           elapsedtime: progressData.elapsedtime,
  //           languageindex: progressData.languageindex,
  //           malatime: progressData.malatime,
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

  return (
    <View style={styles.container}>
      <Image source={Back} style={styles.back} />

      <View style={styles.head}>
        <Head name={lang[i].appname} navigation={navigation} route={route} />
      </View>
      <View>
        <Clock i={i} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {position: 'absolute'},
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
  },
  clocks: {
    alignItems: 'flex-start',
  },
});

export default HomeScreen;
