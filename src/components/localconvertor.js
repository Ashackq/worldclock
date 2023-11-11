import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Text } from 'react-native';
import { lang } from '../devdata/constants/languages';

const Clockback = require('../devdata/assets/dial2.png');
const Hour = require('../devdata/assets/hour.png');
const Minute = require('../devdata/assets/minutes.png');

const Localclock = (props) => {
  const [hourRotation] = useState(new Animated.Value(0));
  const [minuteRotation] = useState(new Animated.Value(0));
  const [dayName, setDayName] = useState('');
  const [analogTime, setAnalogTime] = useState('');
  const [date1, setDate1] = useState('');

  const rotateClockHand = (hand, degrees) => {
    Animated.timing(hand, {
      toValue: degrees,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const updateClock = () => {
    const now = new Date(props.date);
    const minutes = (now.getMinutes() + now.getSeconds() / 60) * 6;
    const hours = ((now.getHours() % 12) + now.getMinutes() / 60) * 30;

    rotateClockHand(minuteRotation, minutes);
    rotateClockHand(hourRotation, hours);

    const dayName1 = new Intl.DateTimeFormat(lang[0].code, {
      weekday: 'short',
    }).format(now);

    const analogTime1 = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const date1 = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    setDayName(dayName1);
    setAnalogTime(analogTime1);
    setDate1(date1);
  };

  useEffect(() => {
    const interval = setInterval(() => updateClock(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [updateClock]);

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
        <Text style={styles.label}>Local</Text>
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
        <Text style={styles.label}>{date1}</Text>
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

export default Localclock;
