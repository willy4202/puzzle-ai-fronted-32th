import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Entry from '@screens/Entry/Entry';
import Login from '@screens/Login/Login';
import Main from '@screens/Main/Main';
import DocList from '@screens/DocList/DocList';
import DocScheme from '@screens/DocScheme/DocScheme';
import REZList from '@screens/REZList/REZList';
import MakeREZ from '@screens/MakeREZ/MakeREZ';
import REZDetail from '@screens/REZDetail/REZDetail';
import REZSubmit from '@screens/REZSubmit/REZSubmit';
import Signup from '@screens/Signup/Signup';
import Splash from '@screens/Splash/Splash';
import {AuthContext} from './src/AuthContext';
import {Asset} from 'react-native-image-picker';
import {
  SelectImageContext,
  SelectSymptomContext,
} from '~/src/ReservationContext';

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
  const {userState, loadData} = useContext(AuthContext);
  const [symptomText, setSymptomText] = useState('');
  const [selectImage, setSelectImage] = useState<Asset[]>([]);

  const textStorage = {symptomText, setSymptomText};
  const imgStorage = {selectImage, setSelectImage};

  useEffect(() => {
    loadData();
  }, []);

  if (userState.isLoading) {
    return <Splash />;
  }

  return (
    <SelectSymptomContext.Provider value={textStorage}>
      <SelectImageContext.Provider value={imgStorage}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator>
                {!userState.isLogIn ? (
                  <>
                    <Stack.Screen name="MakeREZ" component={MakeREZ} />
                    <Stack.Screen
                      name="REZSubmit"
                      component={REZSubmit}
                      options={{title: '', headerShown: false}}
                    />
                    <Stack.Screen name="REZDetail" component={REZDetail} />
                    <Stack.Screen name="Main" component={Main} />
                    <Stack.Screen name="DocList" component={DocList} />
                    <Stack.Screen name="DocScheme" component={DocScheme} />
                    <Stack.Screen name="REZList" component={REZList} />
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
      </SelectImageContext.Provider>
    </SelectSymptomContext.Provider>
  );
}

export default App;
