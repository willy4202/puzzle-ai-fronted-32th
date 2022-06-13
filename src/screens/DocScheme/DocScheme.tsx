import React, {useState, useEffect, useContext, useMemo} from 'react';
import styled, {css} from 'styled-components/native';
import {NewDate} from '~/src/types/type';
import {DocSchemeNavigationProps, SelectDateProp} from '~/src/types/type';
import DoctorCard from '@components/DoctorCard';
import Calendar from '~/src/screens/DocScheme/Calendar.tsx/Calendar';
import TimeTable from './TimeTable/TimeTable';
import Next from '@assets/images/NextIcon.png';
import Prev from '@assets/images/PrevIcon.png';
import {config} from '~/src/config';
import {SelectContext, DocInfoContext} from '../../ReservationContext';
import useFetch from '@components/useFetch';

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

  const {selectDate, setSelectDate} = useContext(SelectContext);
  const {docInfo} = useContext(DocInfoContext);

  const calendarUrl = useMemo(() => {
    const nowCalDate: Date = new Date(date.year, date.month);
    return `${
      config.docScheme
    }/1?year=${nowCalDate.getFullYear()}&month=${nowCalDate.getMonth()}`;
  }, [date.month]);

  const {fetchData: workingDayData} = useFetch<{result: number[]}>(
    calendarUrl,
    'GET',
    'DocScheme',
    null,
  );

  useEffect(() => {
    getAlldate();
  }, [date]);

  const getNewDate = (newDate: Date): NewDate => {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const day = newDate.getDay();

    return {year, month, date, day, time: ''};
  };

  const today: NewDate = useMemo(() => getNewDate(TODAY), []);

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
    setSelectDate({
      year: 0,
      month: 0,
      date: 0,
      day: '',
      time: '',
    });
    direction === 'prev'
      ? setDate(prev => ({...prev, month: date.month - 1}))
      : setDate(prev => ({...prev, month: date.month + 1}));
  };

  const yearHandler = (direction: string) => {
    setSelectDate({
      year: 0,
      month: 0,
      date: 0,
      day: '',
      time: '',
    });
    direction === 'prev'
      ? setDate(prev => ({...prev, year: date.year - 1}))
      : setDate(prev => ({...prev, year: date.year + 1}));
  };

  const goMakeREZ = async (time: string) => {
    setSelectDate((prev: SelectDateProp) => ({...prev, time: time}));
    await navigation.navigate('MakeREZ');
  };

  return (
    <Scheme>
      <SchemeWrapper>
        <CardWrapper>
          <DoctorCard docData={docInfo}></DoctorCard>
        </CardWrapper>
        <CalendarButtonWrapper>
          <PrevYear onPress={() => yearHandler('prev')}>
            <PrevIcon source={Prev} />
            <PrevIcon overlap source={Prev} />
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
            <NextIcon overlap source={Next} />
          </NextYear>
        </CalendarButtonWrapper>
        <WeekInfo>
          {DAYS.map((day: string, idx: number) => (
            <WeekButton key={idx}>
              {workingDayData.result && (
                <WeekText isvalid={workingDayData.result.includes(idx)}>
                  {day}
                </WeekText>
              )}
            </WeekButton>
          ))}
        </WeekInfo>
        {workingDayData.result && (
          <Calendar
            dayoff={workingDayData.result}
            weeklength={calendarDate.length}
            calendarDate={calendarDate}
            today={today}
          />
        )}
      </SchemeWrapper>
      {selectDate.date !== 0 && <TimeTable goMakeREZ={goMakeREZ} date={date} />}
    </Scheme>
  );
}

export default DocScheme;

const Scheme = styled.View`
  flex: 1;
`;

const SchemeWrapper = styled.View`
  flex: 3;
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

const WeekButton = styled.View`
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
`;

const WeekText = styled.Text<{isvalid: boolean}>`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({isvalid}) =>
    isvalid ? ({theme}) => theme.primary : ({theme}) => theme.DOCSchemeCaloff};
`;
