import {Dispatch, SetStateAction} from 'react';

export interface Data {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface InputProps {
  children: string;
  setInputData: Dispatch<SetStateAction<Data>>;
  type: string;
}
