import React, {createContext, useReducer} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '@screens/../config';

type AuthContextType = {
  userState: {isLogIn: boolean; isLoading: boolean};
  login: (email: string, pw: string) => void;
};

const initialValue = {
  userState: {isLogIn: false, isLoading: true},
  login: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialValue);

type StateType = {isLogIn: boolean; isLoading: boolean};
type ActionType = {
  type: 'LOADING' | 'LOADING_DONE' | 'LOG_IN' | 'LOG_OUT';
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOADING_DONE':
      return {
        ...state,
        isLoading: false,
      };

    case 'LOG_IN':
      return {
        ...state,
        isLogIn: true,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLogIn: false,
      };
  }
}

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [userState, dispatch] = useReducer(reducer, {
    isLogIn: false,
    isLoading: false,
  });

  const storeToken = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error('token 저장 실패');
    }
  };

  const authContext = {
    login: async (email: string, password: string) => {
      const response = await fetch(config.signin, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      switch (data.message) {
        case 'signin success':
          storeToken('token', data.token);
          dispatch({type: 'LOG_IN'});
          break;
        case 'please signin on app for doctor':
          Alert.alert('의사는 전용 앱으로 로그인해 주세요.');
          break;
        case 'check email or password':
          Alert.alert('이메일과 비밀번호를 확인해 주세요.');
          break;
      }
    },
    userState,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
