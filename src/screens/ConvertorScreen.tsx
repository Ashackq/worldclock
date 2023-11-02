/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Ads, Clock, Head, WorldClock} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {lang} from '../devdata/constants/languages';
import Footer from '../components/footer';
const Back = require('../devdata/assets/background.png');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Conv'>;

const HomeScreen = ({navigation, route}: HomeProps) => {
  const i = route.params.languageindex;

  return (
    <View style={styles.container}>
      <Image source={Back} style={styles.back} />

      <View style={styles.head}>
        <Head name={lang[i].appname} navigation={navigation} route={route} />
      </View>

      <View style={styles.clocksContainer}>
        <View style={styles.clocksRow}>
          <Clock i={i} />
          <WorldClock navigation={navigation} />
        </View>
        <View style={styles.container1}>
          <Ads />
        </View>
      </View>
      <Footer navigation={navigation} route={route} />
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
    position: 'relative',
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
    alignItems: 'center',
  },
  clocksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 140,
  },
});

export default HomeScreen;