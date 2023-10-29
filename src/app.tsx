/* eslint-disable prettier/prettier */
import React from 'react';
//nav
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import { StyleSheet } from 'react-native';
import {Home, Help, Tnc, About} from './screens';
import {Loading} from './components';

export type RootStackParamList = {
  Home: {
    languageindex: number;
  };
  Edit: {
    languageindex: number;
  };
  Player: {
    languageindex: number;
  };
  Help: {
    languageindex: number;
  };
  About: {
    languageindex: number;
  };
  Tnc: {
    languageindex: number;
  };
  Loading: undefined;
};
const initialRouteParams = {
  languageindex: 0,
};

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Group screenOptions={{headerShown: false, animation: 'fade'}}>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={initialRouteParams}
          />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Tnc" component={Tnc} />
          <Stack.Screen name="About" component={About} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
