import {Dispatch, SetStateAction, ReactNode} from 'react';
import {StackScreenProps} from '@react-navigation/stack';

export type HomeStackParamList = {
  Splash: undefined;
  Entry: undefined;
  Login: undefined;
  Signup: undefined;
  Mains: undefined;
  DocList: CategoryProp;
  DocScheme: undefined;
  REZList: undefined;
  MakeREZ: undefined;
  REZSubmit: undefined;
  REZDetail: undefined;
  Main: undefined;
};

export type EntryNavigationProps = StackScreenProps<
  HomeStackParamList,
  'Entry'
>;

export type LoginNavigationProps = StackScreenProps<
  HomeStackParamList,
  'Login'
>;

export interface LoginPressableProps {
  id: string;
  disabled: boolean;
}

export type SignupNavigationProps = StackScreenProps<
  HomeStackParamList,
  'Signup'
>;

export interface SignupUserData {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface InputProps {
  children: string;
  setUserData: Dispatch<SetStateAction<SignupUserData>>;
  type: string;
}

export interface LoginSignupBtnProps {
  children: ReactNode;
  pressHandler: () => void;
  id?: 'Login' | 'Signup';
  disabled?: boolean;
}

export type MainNavigationProps = StackScreenProps<HomeStackParamList, 'Main'>;

export interface CategoryProp {
  id: number;
  name: string;
  file_location: string;
}

export interface MainDataProp {
  result: CategoryProp[];
  name: string;
}

export type REZListNavigationProps = StackScreenProps<
  HomeStackParamList,
  'REZList'
>;

export type DocListNavigationProps = StackScreenProps<
  HomeStackParamList,
  'DocList'
>;

export interface DocListProp {
  id: number;
  doctor_name: string;
  subject_name: string;
  hospital_name: string;
  doctor_image: string;
}

export interface REZListProp {
  doctor_image: string;
  doctor_name: string;
  hospital_name: string;
  date: string;
  reservation_id: number;
  status_name: string;
  subject_name: string;
  time: string;
}

export type DocSchemeNavigationProps = StackScreenProps<
  HomeStackParamList,
  'DocScheme'
>;

export interface TimeTableProp {
  expired_times: string[];
  working_times: string[];
}

export interface CalendarProps {
  calendarDate: Date[];
  workingDay: number[];
  today: Date;
}

export interface CalBtnProps {
  children: number | string;
  isChecked: boolean;
  dateInfo: Date | null;
  isDayOff: boolean;
}

export type MakeREZNavigationProps = StackScreenProps<
  HomeStackParamList,
  'MakeREZ'
>;

export interface SelectImage {
  type: string;
  fileName: string;
  widht?: number;
  height?: number;
  fileSize?: number;
  uri: string;
}

export type REZDetailNavigationProps = StackScreenProps<
  HomeStackParamList,
  'REZDetail'
>;

export type REZSubmitNavigationProps = StackScreenProps<
  HomeStackParamList,
  'REZSubmit'
>;
