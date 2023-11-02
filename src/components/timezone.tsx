/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {timezonesData} from '../devdata/constants/lang';

const Timezone = ({setSelectedTimeZone, setSelectedLocation, cancel}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState({
    location: 'Chicago',
    timezone: 'GMT - 05:00',
  });
  // Function to filter timezones based on search query
  const filteredTimezones = timezonesData.filter(timezone =>
    timezone.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Function to handle timezone selection
  const handleTimezoneSelect = timezone => {
    setSelectedTimezone(timezone);
  };

  // Function to calculate DST transition (just a placeholder)
  const calculateDSTTransition = () => {
    // Implement your DST transition logic here
  };

  // Function to set the selected zone and display results
  const setZone = () => {
    calculateDSTTransition();
    setSelectedTimeZone(selectedTimezone.timezone);
    setSelectedLocation(selectedTimezone.location);
    cancel(false);
  };

  // Function to cancel the selection and clear the selected timezone
  const cancelSelection = () => {
    console.log('cancel presed');
    cancel(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Country and City</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Your City"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <ScrollView style={styles.selectWrapper}>
        {filteredTimezones.map((timezone, index) => (
          <Text
            key={index}
            style={styles.timezoneItem}
            onPress={() => handleTimezoneSelect(timezone)}>
            {timezone.location} - {timezone.timezone}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.outputContainer}>
        <Text style={styles.outputHeading}>Selected Timezone:</Text>

        <Text style={styles.outputText}>
          Location: {selectedTimezone.location}
        </Text>
        <Text style={styles.outputText}>{selectedTimezone.timezone}</Text>
      </View>

      <TouchableOpacity style={styles.setZoneButton} onPress={setZone}>
        <Text style={styles.setZoneButtonText}>Set Zone</Text>
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

  setZoneButton: {
    padding: 10,
  },
  setZoneButtonText: {
    fontSize: 55,
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

export default Timezone;
