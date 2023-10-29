/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View} from 'react-native';
import Svg, {Circle, Line} from 'react-native-svg';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRotation: '0deg',
      minutesRotation: '0deg',
      hoursRotation: '0deg',
    };

    this.updateClock = this.updateClock.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateClock, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateClock() {
    const now = new Date();
    const seconds = now.getSeconds() * 6; // 6 degrees per second
    const minutes = (now.getMinutes() + now.getSeconds() / 60) * 6; // 6 degrees per minute
    const hours = ((now.getHours() % 12) + now.getMinutes() / 60) * 30; // 30 degrees per hour

    this.setState({
      secondsRotation: `${seconds}deg`,
      minutesRotation: `${minutes}deg`,
      hoursRotation: `${hours}deg`,
    });
  }

  render() {
    return (
      <Svg height="200" width="200">
        <Circle cx="100" cy="100" r="90" fill="white" />
        <Line
          x1="100"
          y1="100"
          x2="100"
          y2="10"
          stroke="black"
          strokeWidth="2"
          transform={`rotate(${this.state.hoursRotation}, 100, 100)`}

        />
        <Line
          x1="100"
          y1="100"
          x2="100"
          y2="5"
          stroke="red"
          strokeWidth="2"
          transform={`rotate(${this.state.minutesRotation}, 100, 100)`}
        />
        <Line
          x1="100"
          y1="100"
          x2="100"
          y2="2"
          stroke="blue"
          strokeWidth="1"
          transform={`rotate(${this.state.secondsRotation}, 100, 100)`}
        />
      </Svg>
    );
  }
}

export default Clock;
