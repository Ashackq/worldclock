import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { timezonesData } from '../devdata/constants/lang';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Timezone = ({
  id,
  Tiz,
  loc,
  setSelectedTimeZone,
  setSelectedLocation,
  cancel,
}) => {
  const updateProgressData = async (index, newLocation, newTimezone) => {
    try {
      const existingData = await AsyncStorage.getItem('times');
      const parsedExistingData = existingData ? JSON.parse(existingData) : [];
      if (index >= 0 && index < parsedExistingData.length) {
        parsedExistingData[index].location = newLocation;
        parsedExistingData[index].timezone = newTimezone;
        await AsyncStorage.setItem('times', JSON.stringify(parsedExistingData));
      } else {
        console.error('Invalid index provided.');
      }
    } catch (error) {
      console.error('Error updating progress data:', error);
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState({
    location: loc || 'London',
    timezone: Tiz || 'GMT + 00:00',
  });

  const filteredTimezones = timezonesData.filter((timezone) =>
    timezone.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTimezoneSelect = (timezone) => {
    setSelectedTimezone(timezone);
    calculateDSTTransition();
  };

  const calculateDSTTransition = () => {
    // Implement your DST transition logic here
  };

  const setZone = () => {
    updateProgressData(
      id,
      selectedTimezone.location,
      selectedTimezone.timezone
    );
    setSelectedTimeZone(selectedTimezone.timezone);
    setSelectedLocation(selectedTimezone.location);
    cancel(false);
  };

  const cancelSelection = () => {
    cancel(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Country and City</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Your City"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <ScrollView style={styles.selectWrapper}>
        {filteredTimezones.map((timezone, index) => (
          <Text
            key={index}
            style={styles.timezoneItem}
            onPress={() => handleTimezoneSelect(timezone)}
          >
            {timezone.location} - {timezone.timezone}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.outputContainer}>
        <Text style={styles.outputHeading}>
          Selected Timezone: {selectedTimezone.timezone}
        </Text>

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
