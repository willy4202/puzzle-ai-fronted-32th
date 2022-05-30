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
