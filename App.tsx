import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Entry from '@screens/Entry/Entry';
import Login from '@screens/Login/Login';
import Mains from '@components/Mains';
import DocList from '@screens/DocList/DocList';
import DocScheme from '@screens/DocScheme/DocScheme';
import MakeREZ from '@screens/MakeREZ/MakeREZ';
import REZDetail from '@screens/REZDetail/REZDetail';
import REZSubmit from '@screens/REZSubmit/REZSubmit';
import Signup from '@screens/Signup/Signup';
import Splash from '@screens/Splash/Splash';
import {AuthContext} from './src/AuthContext';

import {ThemeProvider} from 'styled-components';
import theme from './src/styles/theme';

export type HomeStackParamList = {
  Splash: undefined;
  Entry: undefined;
  Login: undefined;
  Signup: undefined;
  Mains: undefined;
  DocList: undefined;
  DocScheme: undefined;
  REZList: undefined;
  MakeREZ: undefined;
  REZSubmit: undefined;
  REZDetail: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

function App() {
  const {userState, loadData} = useContext(AuthContext);

  useEffect(() => {
    loadData();
  }, []);

  if (userState.isLoading) {
    return <Splash />;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="DocScheme">
            {!userState.isLogIn ? (
              <>
                <Stack.Screen
                  name="REZSubmit"
                  component={REZSubmit}
                  options={{title: '', headerShown: false}}
                />
                <Stack.Screen name="MakeREZ" component={MakeREZ} />
                <Stack.Screen name="DocList" component={DocList} />
                <Stack.Screen name="DocScheme" component={DocScheme} />
                <Stack.Screen name="REZDetail" component={REZDetail} />
                <Stack.Screen
                  name="Mains"
                  component={Mains}
                  options={{headerShown: false}}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Entry" component={Entry} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
