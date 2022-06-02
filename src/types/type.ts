import {Dispatch, SetStateAction} from 'react';

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
