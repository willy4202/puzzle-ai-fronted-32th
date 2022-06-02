import React, {useContext} from 'react';
import styled, {css} from 'styled-components/native';
import {Text, Pressable} from 'react-native';
import theme from '~/src/styles/theme';
import {SelectContext} from '../ReservationContext';
import {NewDate} from '~/src/types/type';

interface CalBtnProps {
  children: string | number;
  isChecked?: boolean;
  dateInfo?: NewDate;
}

function CalendarButton({
  children,
  isChecked = false,
  dateInfo = {year: 0, month: 0, date: 0, day: 0},
}: CalBtnProps) {
  const {selectDate, setSelectDate} = useContext(SelectContext);

  const pressHandler = (dateInfo: NewDate) => {
    if (dateInfo.date !== 0) {
      setSelectDate(dateInfo);
    }
  };

  return (
    <CalendarBtn isChecked={isChecked} onPress={() => pressHandler(dateInfo)}>
      <CalendarText isChecked={isChecked}>{children}</CalendarText>
    </CalendarBtn>
  );
}

export default CalendarButton;

const CalendarBtn = styled.Pressable<{isChecked: boolean}>`
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

const CalendarText = styled.Text<{isChecked: boolean}>`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({isChecked}) =>
    isChecked
      ? ({theme}) => theme.DOCSchemeCalChkFont
      : ({theme}) => theme.DOCSchemeCalFont};
  opacity: ${({children}) => (children === 0 ? 0 : 1)};
`;
