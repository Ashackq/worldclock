/* eslint-disable prettier/prettier */
import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = ({ setDates, Datte }) => {
  const [date, setDate] = useState(new Date(Datte));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setDates(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        <Text style={styles.buttonText}>Show Date Picker</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showTimepicker} style={styles.button}>
        <Text style={styles.buttonText}>Show Time Picker</Text>
      </TouchableOpacity>
      <Text>Selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {},
});

export default App;
