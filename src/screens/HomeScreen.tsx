/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Ads, Clock, Head, WorldClock} from '../components';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {lang} from '../devdata/constants/languages';
const Back = require('../devdata/assets/background.png');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation, route}: HomeProps) => {
  const i = route.params.languageindex;

  return (
    <View style={styles.container}>
      <Image source={Back} style={styles.back} />

      <View style={styles.head}>
        <Head name={lang[i].appname} navigation={navigation} route={route} />
      </View>
      <View style={styles.container1}>
        <Ads />
      </View>
      <View style={styles.clocksContainer}>
        <View style={styles.clocksRow}>
          <Clock i={i} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Loading')}
            style={styles.container2}>
            <WorldClock i={i} location={'helo'} timeZone={'got em'} />
          </TouchableOpacity>
        </View>
        <View style={styles.clocksRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Loading')}
            style={styles.container2}>
            <WorldClock i={i} location={'helo'} timeZone={'got em'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Loading')}
            style={styles.container2}>
            <WorldClock i={i} location={'heo'} timeZone={'got em'} />
          </TouchableOpacity>
        </View>
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
  container1: {
    position: 'absolute',
    top: 340,
  },
  container2: {
    flex: 1,
  },
  back: {position: 'absolute'},
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
  },
  clocksContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  clocksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 140,
  },
});

export default HomeScreen;
