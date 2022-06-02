import React, {createContext} from 'react';
import {NewDate} from '~/src/types/type';

interface SelectProps {
  selectDate: NewDate;
  setSelectDate: React.Dispatch<React.SetStateAction<NewDate>>;
}

export const SelectContext = createContext<SelectProps>({
  selectDate: {
    year: 0,
    month: 0,
    date: 0,
    day: 0,
  },
  setSelectDate: () => {},
});
