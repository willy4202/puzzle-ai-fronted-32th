import React, {createContext, Dispatch, SetStateAction} from 'react';
import {Asset} from 'react-native-image-picker';
<<<<<<< HEAD
import {SelectDateProp, InitialDocListProp} from '~/src/types/type';

interface DocInfoProps {
  docInfo: InitialDocListProp;
  setDocInfo: React.Dispatch<React.SetStateAction<InitialDocListProp>>;
=======
import {SelectDateProp, initialDocListProp} from '~/src/types/type';

interface DocInfoProps {
  docInfo: initialDocListProp;
  setDocInfo: React.Dispatch<React.SetStateAction<initialDocListProp>>;
>>>>>>> 9f586ea (context 전역처리)
}

export const DocInfoContext = createContext<DocInfoProps>({
  docInfo: {
    id: 0,
    name: '',
    subject: '',
    hospital: '',
    profile_image: '',
  },
  setDocInfo: () => {},
});

interface SelectProps {
  selectDate: SelectDateProp;
  setSelectDate: React.Dispatch<React.SetStateAction<SelectDateProp>>;
}

export const SelectContext = createContext<SelectProps>({
  selectDate: {
    year: 0,
    month: 0,
    date: 0,
    day: '',
    time: '',
  },
  setSelectDate: () => {},
});

interface SelectImageProps {
  selectImage: Asset[];
  setSelectImage: Dispatch<SetStateAction<Asset[]>>;
}

export const SelectImageContext = createContext<SelectImageProps>({
  selectImage: [],
  setSelectImage: () => {},
});

interface SelectStymptomProps {
  symptomText: string;
  setSymptomText: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectSymptomContext = createContext<SelectStymptomProps>({
  symptomText: '',
  setSymptomText: () => {},
});
