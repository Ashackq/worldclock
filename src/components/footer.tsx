/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {colors} from '../devdata/constants/lang';

const Footer = ({navigation, route}) => {
  const [activeIcon, setActiveIcon] = useState('Home');
  const i = 1;

  useEffect(() => {
    if (route.name === 'Conv') {
      setActiveIcon('Conv');
    } else {
      setActiveIcon('Home');
    }
  }, [route.name]);

  const handleIconPress = (iconName: string) => {
    setActiveIcon(iconName);
    let targetRoute = '';
    if (iconName === 'Home') {
      targetRoute = 'Home';
    } else if (iconName === 'Conv') {
      targetRoute = 'Conv';
    }

    navigation.push(targetRoute, {
      languageindex: i,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <View style={styles.bottomBar1}>
          <TouchableOpacity
            onPress={() => handleIconPress('Home')}
            style={[styles.bottomBarButton]}>
            <Text style={styles.aftertext}>Clocks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIconPress('Conv')}
            style={[styles.bottomBarButton]}>
            <Text style={styles.aftertext}>Converter</Text>
          </TouchableOpacity>
        </View>
        <Animatable.View
          animation={activeIcon === 'Conv' ? 'slideInRight' : 'slideInLeft'}
          style={[
            styles.bottomBar2,
            activeIcon === 'Conv' && styles.bottomBar2Active,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -50,
    flex: 1,
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 8,
    backgroundColor: colors.headfoot,
  },
  bottomBarButton: {
    backgroundColor: 'grey',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  bottomBar1: {
    backgroundColor: 'grey',
    padding: 3,
    flexDirection: 'row',
    borderRadius: 8,
  },
  bottomBar2: {
    padding: 3,
    flexDirection: 'row',
    borderRadius: 8,
    width: 100,
    height: 30,
    position: 'absolute',
    margin: 3,
    borderColor: 'white',
    borderWidth: 2,
    left: 103,
  },
  bottomBar2Active: {
    left: 203,
  },
  icon: {
    height: 25,
    width: 25,
    tintColor: colors.headfootbuttontext,
  },
  activeIcon: {
    tintColor: colors.tintcolor,
  },
  activeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
  },
  aftertext: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
});

export default Footer;
