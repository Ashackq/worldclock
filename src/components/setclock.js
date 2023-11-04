/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '.';
const SetClock = ({
  initialTimezone,
  initialLocation,
  setDate,
  Date,
  onCancel,
}) => {
  const [selectedTimezone] = useState({
    location: initialLocation || 'London',
    timezone: initialTimezone || 'GMT + 00:00',
  });
  const [date, setDates] = useState(Date);
  const setDateTime = () => {
    setDate(date);
    onCancel(false);
  };

  const cancelSelection = () => {
    onCancel(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set the Date and Time</Text>
      <Picker setDates={setDates} Datte={Date} />
      <View style={styles.outputContainer}>
        <Text style={styles.outputHeading}>
          Timezone: {selectedTimezone.timezone}
        </Text>
        <Text style={styles.outputText}>
          Location: {selectedTimezone.location}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.selectDateTimeButton}
        onPress={setDateTime}
      >
        <Text style={styles.selectDateTimeButtonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={cancelSelection}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
  },
  searchInput: {
    width: '80%',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
  },
  selectWrapper: {
    width: '80%',
    maxHeight: 40,
    borderWidth: 1,
    borderColor: 'gray',
  },
  timezoneItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  outputContainer: {
    padding: 20,
    margin: 20,
    borderRadius: 5,
    maxWidth: 600,
  },
  outputHeading: {
    fontSize: 20,
    marginBottom: 10,
  },
  outputText: {
    fontSize: 16,
  },
  selectDateTimeButton: {
    padding: 10,
  },
  selectDateTimeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkblue',
    textAlign: 'center',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 10,
    padding: 10,
    borderRadius: 5,
    right: 0,
  },
  cancelButtonText: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default SetClock;
