import React, {useState, useEffect, useContext, useMemo, useRef} from 'react';
import styled, {css} from 'styled-components/native';
import {DocSchemeNavigationProps} from '~/src/types/type';
import DoctorCard from '@components/DoctorCard';
import Calendar from '~/src/screens/DocScheme/Calendar.tsx/Calendar';
import TimeTable from './TimeTable/TimeTable';
import Next from '@assets/images/NextIcon.png';
import Prev from '@assets/images/PrevIcon.png';
import {config} from '~/src/config';
import {SelectContext, DocInfoContext} from '../../ReservationContext';
import useFetch from '@components/useFetch';
import {ActivityIndicator} from 'react-native';

const DAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];

function DocScheme({navigation}: DocSchemeNavigationProps) {
  const [calendarDate, setCalendarDate] = useState<Date[]>([]);

  const [currentFirstDate, setcurrentFirstDate] = useState(
    new Date(new Date().setDate(1)),
  );

  const {selectDate, setSelectDate} = useContext(SelectContext);

  const {docInfo} = useContext(DocInfoContext);

  const calendarUrl = useMemo(() => {
    return `${
      config.docScheme
    }/1?year=${currentFirstDate.getFullYear()}&month=${
      currentFirstDate.getMonth() + 1
    }`;
  }, [currentFirstDate]);

  const {fetchData: workingDayData} = useFetch<{result: number[]}>(
    calendarUrl,
    'GET',
    'DocScheme',
    null,
  );

  useEffect(() => {
    getAlldate();
  }, [currentFirstDate]);

  const today: Date = useMemo(() => new Date(), []);

  const getAlldate = () => {
    const prevLastDate = new Date(
      currentFirstDate.getFullYear(),
      currentFirstDate.getMonth(),
      0,
    );

    console.log(prevLastDate);

    let emptyDate =
      prevLastDate.getDay() === 6
        ? new Array(0)
        : new Array(prevLastDate.getDay() + 1).fill('');

    let realDate = new Array(31)
      .fill('')
      .map(
        (el, idx) =>
          new Date(
            currentFirstDate.getFullYear(),
            currentFirstDate.getMonth(),
            currentFirstDate.getDate() + idx,
          ),
      );

    let thisMonthDate = emptyDate.concat(
      realDate.filter(el => el.getMonth() === currentFirstDate.getMonth()),
    );

    let result =
      thisMonthDate.length % 7 === 0
        ? thisMonthDate
        : thisMonthDate.concat(
            new Array(7 - (thisMonthDate.length % 7)).fill(''),
          );

    setCalendarDate(result);
  };

  const monthHandler = (direction: string) => {
    setSelectDate(null);
    direction === 'prev'
      ? setcurrentFirstDate(
          new Date(
            currentFirstDate.getFullYear(),
            currentFirstDate.getMonth() - 1,
          ),
        )
      : setcurrentFirstDate(
          new Date(
            currentFirstDate.getFullYear(),
            currentFirstDate.getMonth() + 1,
          ),
        );
  };

  const yearHandler = (direction: string) => {
    setSelectDate(null);
    direction === 'prev'
      ? setcurrentFirstDate(
          new Date(
            currentFirstDate.getFullYear() - 1,
            currentFirstDate.getMonth(),
          ),
        )
      : setcurrentFirstDate(
          new Date(
            currentFirstDate.getFullYear() + 1,
            currentFirstDate.getMonth(),
          ),
        );
  };

  const goMakeREZ = async (time: string) => {
    const selectHours: number = Number(time.split(':')[0]);
    const selectMinutes: number = Number(time.split(':')[1]);
    const newSelectDate: Date | null =
      selectDate &&
      new Date(selectDate.setHours(selectHours, selectMinutes, 0, 0));
    setSelectDate(newSelectDate);
    navigation.navigate('MakeREZ');
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
          <MonthInfo>{`${currentFirstDate.getFullYear()}년 ${
            currentFirstDate.getMonth() + 1
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
              {workingDayData.result ? (
                <WeekText isvalid={workingDayData.result.includes(idx)}>
                  {day}
                </WeekText>
              ) : (
                <ActivityIndicator></ActivityIndicator>
              )}
            </WeekButton>
          ))}
        </WeekInfo>
        {workingDayData.result ? (
          <Calendar
            calendarDate={calendarDate}
            today={today}
            workingDay={workingDayData.result}
          />
        ) : (
          <ActivityIndicator></ActivityIndicator>
        )}
      </SchemeWrapper>
      {selectDate && <TimeTable goMakeREZ={goMakeREZ} />}
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
