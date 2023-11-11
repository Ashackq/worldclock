import React from 'react';
//nav
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Help, Tnc, About } from './screens';
import { Loading } from './components';

export type RootStackParamList = {
  Home: {
    languageindex: number;
    conv: boolean;
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
// const initialRouteParams = {
//   languageindex: 0,
//   conv: false,
// };

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Group screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Home" component={Home} />

          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Tnc" component={Tnc} />
          <Stack.Screen name="About" component={About} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
