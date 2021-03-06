import React, {useContext, useEffect, useState} from 'react';
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
import {Asset} from 'react-native-image-picker';
import {
  SelectImageContext,
  SelectSymptomContext,
  SelectContext,
  DocInfoContext,
} from '~/src/ReservationContext';

import {ThemeProvider} from 'styled-components';
import theme from './src/styles/theme';
import {HomeStackParamList, DocListProp, REZListProp} from '~/src/types/type';

const Stack = createStackNavigator<HomeStackParamList>();

function App() {
  const {userState, loadData} = useContext(AuthContext);
  const [docInfo, setDocInfo] = useState<DocListProp | REZListProp>({
    id: 0,
    doctor_name: '',
    subject_name: '',
    hospital_name: '',
    doctor_image: '',
  });
  const [symptomText, setSymptomText] = useState('');
  const [selectImage, setSelectImage] = useState<Asset[]>([]);
  const [selectDate, setSelectDate] = useState<Date | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  if (userState.isLoading) {
    return <Splash />;
  }

  return (
    <SelectSymptomContext.Provider value={{symptomText, setSymptomText}}>
      <SelectImageContext.Provider value={{selectImage, setSelectImage}}>
        <SelectContext.Provider value={{selectDate, setSelectDate}}>
          <DocInfoContext.Provider value={{docInfo, setDocInfo}}>
            <ThemeProvider theme={theme}>
              <SafeAreaProvider>
                <NavigationContainer>
                  <Stack.Navigator>
                    {userState.isLogIn ? (
                      <>
                        <Stack.Screen
                          name="Mains"
                          component={Mains}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen name="DocList" component={DocList} />
                        <Stack.Screen
                          name="DocScheme"
                          component={DocScheme}
                          options={{
                            title: docInfo.doctor_name,
                            headerStyle: {shadowColor: 'white'},
                            headerTitleAlign: 'center',
                          }}
                        />
                        <Stack.Screen
                          name="MakeREZ"
                          component={MakeREZ}
                          options={{
                            title: '?????? ??????',
                            headerStyle: {shadowColor: 'white'},
                            headerTitleAlign: 'center',
                          }}
                        />
                        <Stack.Screen
                          name="REZSubmit"
                          component={REZSubmit}
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="REZDetail"
                          component={REZDetail}
                          options={{
                            title: '?????? ????????????',
                            headerStyle: {shadowColor: 'white'},
                            headerTitleAlign: 'center',
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Stack.Screen
                          name="Entry"
                          component={Entry}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen
                          name="Signup"
                          component={Signup}
                          options={{
                            title: '????????????',
                            headerStyle: {shadowColor: 'white'},
                            headerTitleAlign: 'center',
                          }}
                        />
                      </>
                    )}
                  </Stack.Navigator>
                </NavigationContainer>
              </SafeAreaProvider>
            </ThemeProvider>
          </DocInfoContext.Provider>
        </SelectContext.Provider>
      </SelectImageContext.Provider>
    </SelectSymptomContext.Provider>
  );
}

export default App;
