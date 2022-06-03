import {Dispatch, SetStateAction} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../App';

export interface UserData {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface InputProps {
  children: string;
  setUserData: Dispatch<SetStateAction<UserData>>;
  type: string;
}

export interface SelectImage {
  type: string;
  fileName: string;
  widht?: number;
  height?: number;
  fileSize?: number;
  uri: string;
}

export interface NewDate {
  year: number;
  month: number;
  date: number;
  day: number;
}

export type DocSchemeNavigationProps = StackScreenProps<
  HomeStackParamList,
  'DocScheme'
>;
