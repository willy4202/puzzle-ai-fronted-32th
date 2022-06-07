import React, {useContext} from 'react';
import styled from 'styled-components/native';
import CalendarButton from '@components/CalendarButton';
import {NewDate, CalendarProps} from '~/src/types/type';
import {SelectContext} from '../ReservationContext';

function Calendar({calendarDate, weeklength}: CalendarProps) {
  const {selectDate} = useContext(SelectContext);
  return (
    <CalendarWrapper>
      <FirstWeek>
        {calendarDate.slice(0, 7).map((date: NewDate, idx: number) => (
          <CalendarButton
            key={idx}
            isChecked={selectDate.date !== 0 && date.date === selectDate.date}
            dateInfo={date}>
            {date.date}
          </CalendarButton>
        ))}
      </FirstWeek>
      <SecondWeek>
        {calendarDate.slice(7, 14).map((date: NewDate, idx: number) => (
          <CalendarButton
            key={idx}
            isChecked={selectDate.date !== 0 && date.date === selectDate.date}
            dateInfo={date}>
            {date.date}
          </CalendarButton>
        ))}
      </SecondWeek>
      <ThirdWeek>
        {calendarDate.slice(14, 21).map((date: NewDate, idx: number) => (
          <CalendarButton
            key={idx}
            isChecked={selectDate.date !== 0 && date.date === selectDate.date}
            dateInfo={date}>
            {date.date}
          </CalendarButton>
        ))}
      </ThirdWeek>
      <FourthWeek>
        {calendarDate.slice(21, 28).map((date: NewDate, idx: number) => (
          <CalendarButton
            key={idx}
            isChecked={selectDate.date !== 0 && date.date === selectDate.date}
            dateInfo={date}>
            {date.date}
          </CalendarButton>
        ))}
      </FourthWeek>
      {weeklength !== 28 && (
        <>
          <FifthWeek>
            {calendarDate.slice(28, 35).map((date: NewDate, idx: number) => (
              <CalendarButton
                key={idx}
                isChecked={
                  selectDate.date !== 0 && date.date === selectDate.date
                }
                dateInfo={date}>
                {date.date}
              </CalendarButton>
            ))}
          </FifthWeek>
          {weeklength === 42 && (
            <LastWeek>
              {calendarDate.slice(35, 42).map((date: NewDate, idx: number) => (
                <CalendarButton
                  key={idx}
                  isChecked={
                    selectDate.date !== 0 && date.date === selectDate.date
                  }
                  dateInfo={date}>
                  {date.date}
                </CalendarButton>
              ))}
            </LastWeek>
          )}
        </>
      )}
    </CalendarWrapper>
  );
}

export default Calendar;

const CalendarWrapper = styled.View`
  flex: 1;
`;

const FirstWeek = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
`;

const SecondWeek = styled(FirstWeek)``;

const ThirdWeek = styled(SecondWeek)``;

const FourthWeek = styled(ThirdWeek)``;

const FifthWeek = styled(SecondWeek)``;

const LastWeek = styled(SecondWeek)``;
