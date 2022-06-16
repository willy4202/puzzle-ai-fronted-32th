import React, {createContext, Dispatch, SetStateAction} from 'react';
import {Asset} from 'react-native-image-picker';
import {DocListProp, REZListProp} from '~/src/types/type';

interface DocInfoProps {
  docInfo: DocListProp | REZListProp;
  setDocInfo: React.Dispatch<React.SetStateAction<DocListProp | REZListProp>>;
}

export const DocInfoContext = createContext<DocInfoProps>({
  docInfo: {
    id: 0,
    doctor_name: '',
    subject_name: '',
    hospital_name: '',
    doctor_image: '',
  },
  setDocInfo: () => {},
});

interface SelectProps {
  selectDate: Date | null;
  setSelectDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const SelectContext = createContext<SelectProps>({
  selectDate: null,
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
