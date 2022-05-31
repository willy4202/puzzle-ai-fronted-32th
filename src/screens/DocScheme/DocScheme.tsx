import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import styled, {css} from 'styled-components/native';
import {NewDate} from '~/types/type';
import {DocSchemeNavigationProps} from '~/types/type';
import DoctorCard from '@components/DoctorCard';
import CalendarButton from '@components/CalendarButton';
import Calendar from '@components/Calendar';
import Next from '@assets/images/NextIcon.png';
import Prev from '@assets/images/PrevIcon.png';

const DAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];

function DocScheme({navigation}: DocSchemeNavigationProps) {
  const [calendarDate, setCalendarDate] = useState<NewDate[]>([]);
  const [initialDate, setInitialDate] = useState({
    year: 0,
    month: 0,
    date: 0,
    day: 0,
  });
  useEffect(() => {
    navigation.setOptions({
      title: '홍정의선생님',
      headerStyle: {shadowColor: 'white'},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useEffect(() => {
    getAlldate(getNewDate(new Date()));
  }, []);

  const getNewDate = (newDate: Date): NewDate => {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const day = newDate.getDay();

    return {year, month, date, day};
  };

  const getAlldate = (newDate: NewDate) => {
    const selectFirstDate = getNewDate(
      new Date(newDate.year, newDate.month - 1, 1),
    );

    setInitialDate(selectFirstDate);

    const prevLastDate = getNewDate(
      new Date(selectFirstDate.year, selectFirstDate.month - 1, 0),
    );
    let emptyDate =
      prevLastDate.day === 6
        ? new Array(0)
        : new Array(prevLastDate.day + 1).fill({
            year: '',
            month: '',
            date: '',
            day: '',
          });
    let realDate = new Array(31)
      .fill('')
      .map((el, idx) =>
        getNewDate(
          new Date(
            selectFirstDate.year,
            selectFirstDate.month - 1,
            selectFirstDate.date + idx,
          ),
        ),
      );
    let thisMonthDate = emptyDate.concat(
      realDate.filter(el => el.month === selectFirstDate.month),
    );
    let result =
      thisMonthDate.length % 7 === 0
        ? thisMonthDate
        : thisMonthDate.concat(
            new Array(7 - (thisMonthDate.length % 7)).fill({
              year: '',
              month: '',
              date: '',
              day: '',
            }),
          );
    setCalendarDate(result);
  };

  return (
    <SchemeWrapper>
      <CardWrapper>
        <DoctorCard></DoctorCard>
      </CardWrapper>
      <CalendarButtonWrapper>
        <PrevYear
          onPress={() => {
            getAlldate(
              getNewDate(
                new Date(initialDate.year - 1, initialDate.month - 1, 1),
              ),
            );
          }}>
          <PrevIcon source={Prev} />
          <PrevIcon overlap={true} source={Prev} />
        </PrevYear>
        <PrevMonth
          onPress={() => {
            getAlldate(
              getNewDate(new Date(initialDate.year, initialDate.month - 2, 1)),
            );
          }}>
          <PrevIcon source={Prev} />
        </PrevMonth>
        <MonthInfo>{`${initialDate.year}년 ${initialDate.month}월`}</MonthInfo>
        <NextMonth
          onPress={() => {
            getAlldate(
              getNewDate(new Date(initialDate.year, initialDate.month, 1)),
            );
          }}>
          <NextIcon source={Next} />
        </NextMonth>
        <NextYear
          onPress={() => {
            getAlldate(
              getNewDate(
                new Date(initialDate.year + 1, initialDate.month - 1, 1),
              ),
            );
          }}>
          <NextIcon source={Next} />
          <NextIcon overlap={true} source={Next} />
        </NextYear>
      </CalendarButtonWrapper>
      <WeekInfo>
        {DAYS.map((day, idx) => (
          <CalendarButton key={idx} type="week">
            {day}
          </CalendarButton>
        ))}
      </WeekInfo>
      <Calendar isLastWeek={calendarDate.length} calendarDate={calendarDate} />
    </SchemeWrapper>
  );
}

export default DocScheme;

const SchemeWrapper = styled.View`
  flex: 1;
  padding: 0px 18px 0px;
  background-color: white;
`;

const CardWrapper = styled.View`
  margin-top: 33px;
`;

const CalendarButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 29px;
  padding: 0px 66.72px 0px 67.79px;
`;

const PrevYear = styled.Pressable`
  flex-direction: row;
`;

const PrevMonth = styled(PrevYear)``;

const MonthInfo = styled.Text`
  font-size: ${({theme}) => theme.fontMedium};
  color: ${({theme}) => theme.DOCSchemeCalFont};
`;

const NextMonth = styled(PrevYear)``;

const NextYear = styled(PrevYear)``;

const PrevIcon = styled.Image<{overlap?: boolean}>`
  width: 6.52px;
  height: 9.98px;
  ${({overlap}) => {
    if (overlap) {
      return css`
        position: absolute;
        right: 4.32px;
      `;
    }
  }}
`;

const NextIcon = styled(PrevIcon)``;

const WeekInfo = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 38px;
`;
