/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet, Image, Modal, TouchableOpacity} from 'react-native';
import {Ads, Head, Convertor, SetClock} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {lang} from '../devdata/constants/languages';
import Footer from '../components/footer';
const Back = require('../devdata/assets/background.png');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Conv'>;

const Contervo = ({navigation, route}: HomeProps) => {
  const i = 1;
  const [showTimezone, setShowTimezone] = useState(false);
  const [TZ, setTimeZone] = useState('GMT + 00:00');
  const [Location, setLocation] = useState('London');
  const [Time, setTime] = useState('00:00');
  const [Date, setDate] = useState('2000-01-01T00:00:00.000Z');
  const openTimezoneSelector = () => {
    setShowTimezone(true);
  };
  return (
    <View style={styles.container}>
      <Image source={Back} style={styles.back} />

      <View style={styles.head}>
        <Head name={lang[i].appname} navigation={navigation} route={route} />
      </View>

      <View style={styles.clocksContainer}>
        <View style={styles.clocksRow}>
          <View style={styles.clocksRowelement}>
            <TouchableOpacity onPress={openTimezoneSelector}>
              <Convertor Time={Time} date={Date} tz={TZ} loc={Location} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.clocksRow}>
          <View style={styles.clocksRowadd}>
            <Ads />
          </View>
        </View>
      </View>
      <Modal visible={showTimezone} animationType="slide">
        <SetClock
          initialTimezone={TZ}
          initialLocation={Location}
          setSelectedTimeZone={newTimeZone => setTimeZone(newTimeZone)}
          setSelectedLocation={newLocation => setLocation(newLocation)}
          onCancel={setShowTimezone}
        />
      </Modal>
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

export default Contervo;
