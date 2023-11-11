import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import {
  Ads,
  Clock,
  Convertor,
  Head,
  WorldClock,
  SetClock,
  Localclock,
} from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages';
import Footer from '../components/footer';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Back = require('../devdata/assets/background.png');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation, route }: HomeProps) => {
  const conv = route.params.conv;
  const [hi, sethi] = useState(0);
  const loadProgressData = async () => {
    try {
      const data = await AsyncStorage.getItem('times');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading progress data:', error);
      return [];
    }
  };
  const [timesarray, setarray] = useState([
    { timezone: 'GMT - 05:00', location: 'Chicago' },
    { timezone: 'GMT - 07:00', location: 'Los Angeles' },
    { timezone: 'GMT + 00:00', location: 'Londo' },
  ]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadProgressData();
        console.log(data);
        setarray(data);
        console.log(timesarray);
      } catch (error) {
        console.error('Error loading progress data:', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    console.log(timesarray);
  }, [timesarray]);

  const [showTimezone, setShowTimezone] = useState(false);

  const [Date, setDate] = useState('2000-01-01T00:00:00.000Z');
  const openTimezoneSelector = () => {
    setShowTimezone(true);
  };

  return (
    <View style={styles.container}>
      <Image source={Back} style={styles.back} />

      <View style={styles.head}>
        <Head name={lang[0].appname} navigation={navigation} route={route} />
      </View>

      <View style={styles.clocksContainer}>
        <View style={styles.clocksRow}>
          <View style={styles.clocksRowelement}>
            {!conv && <Clock i={0} />}
            {conv && (
              <TouchableOpacity onPress={openTimezoneSelector}>
                <Localclock date={Date} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.clocksRowelement}>
            {!conv && (
              <WorldClock
                id={0}
                tz={timesarray[0].timezone}
                loc={timesarray[0].location}
              />
            )}

            {conv && (
              <TouchableOpacity onPress={openTimezoneSelector}>
                <Convertor
                  date={Date}
                  tz={timesarray[0].timezone}
                  id={0}
                  loc={timesarray[0].location}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.clocksRow}>
          <View style={styles.clocksRowadd}>
            <Ads />
          </View>
        </View>
        <View style={styles.clocksRow}>
          <View style={styles.clocksRowelement}>
            {!conv && (
              <WorldClock
                id={1}
                tz={timesarray[1].timezone}
                loc={timesarray[1].location}
              />
            )}
            {conv && (
              <TouchableOpacity onPress={openTimezoneSelector}>
                <Convertor
                  date={Date}
                  tz={timesarray[1].timezone}
                  id={1}
                  loc={timesarray[1].location}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.clocksRowelement}>
            {!conv && (
              <WorldClock
                id={2}
                tz={timesarray[2].timezone}
                loc={timesarray[2].location}
              />
            )}

            {conv && (
              <TouchableOpacity onPress={openTimezoneSelector}>
                <Convertor
                  date={Date}
                  tz={timesarray[2].timezone}
                  id={2}
                  loc={timesarray[2].location}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <Modal visible={showTimezone} animationType="slide">
        <SetClock
          Date={Date}
          initialTimezone={timesarray[hi].timezone}
          initialLocation={timesarray[hi].location}
          setDate={setDate}
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
  back: { position: 'absolute' },
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
