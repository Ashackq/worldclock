import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
const Back = require('../devdata/assets/background.png');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const LoadingScreen = ({ navigation }: HomeProps) => {
  const storeProgressData = async (data) => {
    try {
      await AsyncStorage.setItem('times', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving progress data:', error);
    }
  };
  useEffect(() => {
    const loadProgressData = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem('times');
        if (storedProgress) {
          setTimeout(() => {
            navigation.replace('Home', {
              languageindex: 0,
              conv: false,
            });
          }, 2000);
        } else {
          storeProgressData([
            { timezone: 'GMT - 05:00', location: 'Chicago' },
            { timezone: 'GMT - 07:00', location: 'Los Angeles' },
            { timezone: 'GMT + 00:00', location: 'London' },
          ]);
          loadProgressData();
        }
      } catch (error) {
        console.error('Error loading progress data:', error);
      }
    };
    loadProgressData();
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
