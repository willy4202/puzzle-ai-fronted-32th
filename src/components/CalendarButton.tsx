import React, {useContext} from 'react';
import styled, {css} from 'styled-components/native';
import {SelectContext} from '../ReservationContext';
import {NewDate, CalBtnProps} from '~/src/types/type';

function CalendarButton({
  children,
  isDayOff,
  isChecked,
  dateInfo = {year: 0, month: 0, date: 0, day: 0},
}: CalBtnProps) {
  const {selectDate, setSelectDate} = useContext(SelectContext);

  const pressHandler = (dateInfo: NewDate) => {
    if (dateInfo.date !== 0) {
      setSelectDate(dateInfo);
    }
  };

  return (
    <CalendarBtn
      disabled={isDayOff}
      isChecked={isChecked}
      onPress={() => pressHandler(dateInfo)}>
      <CalendarText isDayOff={isDayOff} isChecked={isChecked}>
        {children}
      </CalendarText>
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

const CalendarText = styled.Text<{isChecked: boolean; isDayOff: boolean}>`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({isChecked, isDayOff}) =>
    isDayOff
      ? ({theme}) => theme.DOCSchemeCaloff
      : isChecked
      ? ({theme}) => theme.DOCSchemeCalChkFont
      : ({theme}) => theme.DOCSchemeCalFont};
  opacity: ${({children}) => (children === 0 ? 0 : 1)};
`;
