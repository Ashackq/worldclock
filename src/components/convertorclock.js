/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Text } from 'react-native';
import { lang } from '../devdata/constants/languages';

const Clockback = require('../devdata/assets/dial2.png');
const Hour = require('../devdata/assets/hour.png');
const Minute = require('../devdata/assets/minutes.png');

const Convertorclock = (props) => {
  const [hourRotation] = useState(new Animated.Value(0));
  const [minuteRotation] = useState(new Animated.Value(0));
  const i = 1;
  const TZ = props.tz;
  const Location = props.loc;
  const [dayName, setDayName] = useState('');
  const [analogTime, setAnalogTime] = useState('');
  const [date, setDate] = useState(props.date);

  const getTimeZoneOffset = (Timebro) => {
    const parts = Timebro.split(' ');
    const offsetString = parts[2];
    const [sign, hours, minutes] = offsetString.match(/([-+]?\d{2}):(\d{2})/);
    const totalOffset =
      (parseInt(hours) * 60 + parseInt(minutes)) * (sign === '-' ? -1 : 1);
    return totalOffset;
  };

  const rotateClockHand = (hand, degrees) => {
    Animated.timing(hand, {
      toValue: degrees,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const updateClock = (Timebro) => {
    const now = new Date(props.date);
    const timeZoneOffset = getTimeZoneOffset(Timebro);
    now.setMinutes(now.getMinutes() + timeZoneOffset);
    const minutes = (now.getUTCMinutes() + now.getUTCSeconds() / 60) * 6;
    const hours = ((now.getUTCHours() % 12) + now.getUTCMinutes() / 60) * 30;

    rotateClockHand(minuteRotation, minutes);
    rotateClockHand(hourRotation, hours);

    const dayName1 = new Intl.DateTimeFormat(lang[i].code, {
      weekday: 'short',
    }).format(now);

    const analogTime1 = `${now.getUTCHours().toString().padStart(2, '0')}:${now
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}`;

    const date1 = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    setDayName(dayName1);
    setAnalogTime(analogTime1);
    setDate(date1);
  };

  useEffect(() => {
    const interval = setInterval(() => updateClock(TZ), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [TZ, updateClock]);

  const hourTransform = hourRotation.interpolate({
    inputRange: [1, 360],
    outputRange: ['1deg', '360deg'],
  });

  const minuteTransform = minuteRotation.interpolate({
    inputRange: [1, 360],
    outputRange: ['1deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text>Select Time Zone</Text>

      <Image source={Clockback} style={styles.img2} />
      <View style={styles.labelcont}>
        <Text style={styles.label}>{Location}</Text>
      </View>
      <Animated.Image
        source={Hour}
        style={[styles.clockHand, { transform: [{ rotate: hourTransform }] }]}
      />
      <Animated.Image
        source={Minute}
        style={[styles.clockHand, { transform: [{ rotate: minuteTransform }] }]}
      />
      <View style={styles.detailscont}>
        <Text style={styles.label}>
          {dayName}, {analogTime}
        </Text>
        <Text style={styles.label}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editview: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  container: { justifyContent: 'center', alignItems: 'center' },
  labelcont: {
    position: 'relative',
    top: -50,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailscont: {
    position: 'relative',
    top: 30,
  },
  img2: {
    flex: 1,
    position: 'absolute',
    height: 200,
    width: 200,
  },
  clockHand: {
    position: 'absolute',
    height: 200,
    width: 200,
  },
  timeZoneSelector: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Convertorclock;
