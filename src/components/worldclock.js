/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
} from 'react-native';
import {lang} from '../devdata/constants/languages';

const Clockback = require('../devdata/assets/dial2.png');
const Hour = require('../devdata/assets/hour.png');
const Second = require('../devdata/assets/second.png');
const Minute = require('../devdata/assets/minutes.png');

const WorldClock = props => {
  const [hourRotation] = useState(new Animated.Value(0));
  const [minuteRotation] = useState(new Animated.Value(0));
  const [secondRotation] = useState(new Animated.Value(0));
  const [i] = useState(props.i);
  const [navigation] = useState(props.navigation);

  const [dayName, setDayName] = useState('');
  const [analogTime, setAnalogTime] = useState('');
  const [date, setDate] = useState('');

  const resetSecondHandRotation = () => {
    secondRotation.setValue(0);
  };

  const openTimeZoneSelector = () => {
    console.log('haha');
  };

  const rotateClockHand = (hand, degrees) => {
    Animated.timing(hand, {
      toValue: degrees,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const updateClock = () => {
    const now = new Date(); // Get the current UTC time
    const seconds = now.getUTCSeconds() * 6;
    if (seconds === 0 && prevSeconds !== 0) {
      resetSecondHandRotation();
    }
    prevSeconds = seconds;

    const minutes = (now.getUTCMinutes() + now.getUTCSeconds() / 60) * 6;
    const hours = ((now.getUTCHours() % 12) + now.getUTCMinutes() / 60) * 30;

    rotateClockHand(secondRotation, seconds);
    rotateClockHand(minuteRotation, minutes);
    rotateClockHand(hourRotation, hours);

    const dayName = new Intl.DateTimeFormat(lang[i].code, {
      weekday: 'short',
    }).format(now);

    const analogTime = `${now.getUTCHours().toString().padStart(2, '0')}:${now
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}`;

    const date = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    setDayName(dayName);
    setAnalogTime(analogTime);
    setDate(date);
  };

  useEffect(() => {
    const interval = setInterval(updateClock, 1000);
    updateClock();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hourTransform = hourRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const minuteTransform = minuteRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const secondTransform = secondRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openTimeZoneSelector} style={styles.container}>
        <Text>Select Time Zone</Text>

        <Image source={Clockback} style={styles.img2} />
        <View style={styles.labelcont}>
          <Text style={styles.label}>{lang[i].local}</Text>
        </View>
        <Animated.Image
          source={Hour}
          style={[styles.clockHand, {transform: [{rotate: hourTransform}]}]}
        />
        <Animated.Image
          source={Minute}
          style={[styles.clockHand, {transform: [{rotate: minuteTransform}]}]}
        />
        <Animated.Image
          source={Second}
          style={[styles.clockHand, {transform: [{rotate: secondTransform}]}]}
        />
        <View style={styles.detailscont}>
          <Text style={styles.label}>
            {dayName}, {analogTime}
          </Text>
          <Text style={styles.label}>{date}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelcont: {
    position: 'relative',
    top: -40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailscont: {
    position: 'relative',
    top: 40,
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

export default WorldClock;
