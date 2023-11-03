/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Image, StyleSheet, Animated, Easing, Text} from 'react-native';

const Clockback = require('../devdata/assets/dial2.png');
const Hour = require('../devdata/assets/hour.png');
const Second = require('../devdata/assets/second.png');
const Minute = require('../devdata/assets/minutes.png');
import {lang} from '../devdata/constants/languages';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.hourRotation = new Animated.Value(0);
    this.minuteRotation = new Animated.Value(0);
    this.secondRotation = new Animated.Value(0);
    this.i = this.props.i;

    this.updateClock = this.updateClock.bind(this);
    this.prevSeconds = -1;
  }

  resetSecondHandRotation() {
    this.secondRotation.setValue(0);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateClock, 1000);
    this.updateClock();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateClock() {
    const now = new Date();
    const seconds = now.getSeconds() * 6;
    if (seconds === 0 && this.prevSeconds !== 0) {
      this.resetSecondHandRotation();
    }
    this.prevSeconds = seconds;

    const minutes = (now.getMinutes() + now.getSeconds() / 60) * 6;
    const hours = ((now.getHours() % 12) + now.getMinutes() / 60) * 30;

    this.rotateClockHand(this.secondRotation, seconds);
    this.rotateClockHand(this.minuteRotation, minutes);
    this.rotateClockHand(this.hourRotation, hours);

    // Get the day of the week and month
    const dayName = new Intl.DateTimeFormat(lang[this.i].code, {
      weekday: 'short',
    }).format(now);
    const monthName = new Intl.DateTimeFormat(lang[this.i].code, {
      month: 'short',
    }).format(now);

    this.setState({
      dayName: dayName,
      monthName: monthName,
    });
  }

  rotateClockHand(hand, degrees) {
    Animated.timing(hand, {
      toValue: degrees,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const hourTransform = this.hourRotation.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    const minuteTransform = this.minuteRotation.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    const secondTransform = this.secondRotation.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    const now = new Date();
    const dayName = new Intl.DateTimeFormat(lang[this.i].code, {
      weekday: 'short',
    }).format(now);
    const analogTime = now.toLocaleTimeString(lang[this.i].code, {
      hour: '2-digit',
      minute: '2-digit',
    });
    const date = now.toLocaleDateString(lang[this.i].code, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return (
      <View style={styles.container}>
        <Image source={Clockback} style={styles.img2} />
        <View style={styles.labelcont}>
          <Text style={styles.label}>Local</Text>
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
      </View>
    );
  }
}

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
});

export default Clock;
