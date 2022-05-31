import React, {useContext} from 'react';
import styled, {css} from 'styled-components/native';
import {Text, Pressable} from 'react-native';
import theme from '~/src/styles/theme';
import {SelectContext} from '~/src/SelectContext';
import {NewDate} from '~/src/types/type';

interface CalBtnProps {
  children: string | number;
  type?: string;
  isChecked?: boolean;
  dateInfo?: NewDate;
}

function CalendarButton({
  children,
  isChecked = false,
  type = '',
  dateInfo = {year: 0, month: 0, date: 0, day: 0},
}: CalBtnProps) {
  const {selectDate, setSelectDate} = useContext(SelectContext);

  const pressHandler = (dateInfo: NewDate) => {
    if (typeof dateInfo.date === 'number') {
      setSelectDate(dateInfo);
    }
  };

  return (
    <CalendarBtn
      isChecked={isChecked}
      onPress={() => pressHandler(dateInfo)}
      types={type}>
      <CalendarText isChecked={isChecked} types={type}>
        {children}
      </CalendarText>
    </CalendarBtn>
  );
}

export default CalendarButton;

const CalendarBtn = styled.Pressable<{types: string; isChecked: boolean}>`
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  ${({isChecked}) => {
    if (isChecked) {
      return css`
        background-color: ${({theme}) => theme.DOCSchemeCalChkBack};
        border-radius: 20px;
      `;
    }
  }}
`;

const CalendarText = styled.Text<{types: string; isChecked: boolean}>`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({types, isChecked}) =>
    types === 'week'
      ? ({theme}) => theme.primary
      : isChecked
      ? ({theme}) => theme.DOCSchemeCalChkFont
      : ({theme}) => theme.DOCSchemeCalFont};
  opacity: ${({children}) => (children === 0 ? 0 : 1)};
`;
