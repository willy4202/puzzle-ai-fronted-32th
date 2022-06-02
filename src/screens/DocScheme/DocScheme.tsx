import React, {useState, useEffect} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import styled, {css} from 'styled-components/native';
import {NewDate} from '~/src/types/type';
import {DocSchemeNavigationProps} from '~/src/types/type';
import DoctorCard from '@components/DoctorCard';
import CalendarButton from '@components/CalendarButton';
import Calendar from '@components/Calendar';
import Next from '@assets/images/NextIcon.png';
import Prev from '@assets/images/PrevIcon.png';

const DAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];
const TODAY = new Date();

function DocScheme({navigation}: DocSchemeNavigationProps) {
  const [calendarDate, setCalendarDate] = useState<NewDate[]>([]);
  const [date, setDate] = useState({
    year: TODAY.getFullYear(),
    month: TODAY.getMonth() + 1,
    date: TODAY.getDate(),
    day: TODAY.getDay(),
  });

  useEffect(() => {
    navigation.setOptions({
      title: '홍정의선생님',
      headerStyle: {shadowColor: 'white'},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useEffect(() => {
    getAlldate();
  }, [date]);

  const getNewDate = (newDate: Date): NewDate => {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const day = newDate.getDay();

    return {year, month, date, day};
  };

  const getAlldate = () => {
    const selectFirstDate = getNewDate(new Date(date.year, date.month - 1, 1));

    const prevLastDate = getNewDate(
      new Date(selectFirstDate.year, selectFirstDate.month - 1, 0),
    );

    let emptyDate =
      prevLastDate.day === 6
        ? new Array(0)
        : new Array(prevLastDate.day + 1).fill({
            year: 0,
            month: 0,
            date: 0,
            day: 0,
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
              year: 0,
              month: 0,
              date: 0,
              day: 0,
            }),
          );

    setCalendarDate(result);
  };

  const monthHandler = (direction: string) => {
    direction === 'prev'
      ? setDate(prev => ({...prev, month: date.month - 1}))
      : setDate(prev => ({...prev, month: date.month + 1}));
  };

  const yearHandler = (direction: string) => {
    direction === 'prev'
      ? setDate(prev => ({...prev, year: date.year - 1}))
      : setDate(prev => ({...prev, year: date.year + 1}));
  };

  return (
    <SchemeWrapper>
      <CardWrapper>
        <DoctorCard></DoctorCard>
      </CardWrapper>
      <CalendarButtonWrapper>
        <PrevYear onPress={() => yearHandler('prev')}>
          <PrevIcon source={Prev} />
          <PrevIcon overlap={true} source={Prev} />
        </PrevYear>
        <PrevMonth onPress={() => monthHandler('prev')}>
          <PrevIcon source={Prev} />
        </PrevMonth>
        <MonthInfo>{`${new Date(date.year, date.month - 1).getFullYear()}년 ${
          new Date(date.year, date.month - 1).getMonth() + 1
        }월`}</MonthInfo>
        <NextMonth onPress={() => monthHandler('next')}>
          <NextIcon source={Next} />
        </NextMonth>
        <NextYear onPress={() => yearHandler('next')}>
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
