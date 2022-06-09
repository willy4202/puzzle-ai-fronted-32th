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

export interface InitialDocListProp {
  id: number;
  name: string;
  subject: string;
  hospital: string;
  profile_image: string;
}

export type DocSchemeNavigationProps = StackScreenProps<
  HomeStackParamList,
  'DocScheme'
>;

export interface NewDate {
  year: number;
  month: number;
  date: number;
  day: number;
  time: string;
}

export interface SelectDateProp {
  year: number;
  month: number;
  date: number;
  day: string;
  time: string;
}

export interface CalendarProps {
  calendarDate: NewDate[];
  weeklength: number;
  dayoff: number[];
  today: NewDate;
}

export interface CalBtnProps {
  children: number;
  isChecked: boolean;
  dateInfo: NewDate;
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
