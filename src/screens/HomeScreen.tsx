/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Ads, Clock, Head, WorldClock} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {lang} from '../devdata/constants/languages';
import Footer from '../components/footer';
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

      <View style={styles.clocksContainer}>
        <View style={styles.clocksRow}>
          <View style={styles.clocksRowelement}>
            <Clock i={i} />
          </View>
          <View style={styles.clocksRowelement}>
            <WorldClock />
          </View>
        </View>
        <View style={styles.clocksRow}>
          <View style={styles.clocksRowadd}>
            <Ads />
          </View>
        </View>
        <View style={styles.clocksRow}>
          <View style={styles.clocksRowelement}>
            <WorldClock />
          </View>
          <View style={styles.clocksRowelement}>
            <WorldClock />
          </View>
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
    marginTop: 80,
  },
  clocksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  clocksRowelement: {
    margin: 50,
  },
  clocksRowadd: {
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
