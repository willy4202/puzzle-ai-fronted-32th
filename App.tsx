import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Entry from './src/screens/Entry/Entry';
import Login from './src/screens/Login/Login';
import Main from './src/screens/Main/Main';
import DocList from './src/screens/DocList/DocList';
import DocScheme from './src/screens/DocScheme/DocScheme';
import REZList from './src/screens/REZList/REZList';
import MakeREZ from './src/screens/MakeREZ/MakeREZ';
import REZDetail from './src/screens/REZDetail/REZDetail';
import REZSubmit from './src/screens/REZSubmit/REZSubmit';
import Signup from './src/screens/Signup/Signup';
import Splash from './src/screens/Splash/Splash';

import {ThemeProvider} from 'styled-components';
import theme from './src/styles/theme';

export type HomeStackParamList = {
  Splash: undefined;
  Entry: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
  DocList: undefined;
  DocScheme: undefined;
  REZList: undefined;
  MakeREZ: undefined;
  REZSubmit: undefined;
  REZDetail: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen
              name="Entry"
              component={Entry}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="DocList" component={DocList} />
            <Stack.Screen name="DocScheme" component={DocScheme} />
            <Stack.Screen name="REZList" component={REZList} />
            <Stack.Screen name="MakeREZ" component={MakeREZ} />
            <Stack.Screen name="REZSubmit" component={REZSubmit} />
            <Stack.Screen name="REZDetail" component={REZDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
