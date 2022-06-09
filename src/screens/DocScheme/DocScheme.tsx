import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import {Alert, FlatList} from 'react-native';
import styled, {css} from 'styled-components/native';
import {NewDate} from '~/src/types/type';
import {DocSchemeNavigationProps, SelectDateProp} from '~/src/types/type';
import DoctorCard from '@components/DoctorCard';
import Calendar from '@components/Calendar';
import Next from '@assets/images/NextIcon.png';
import Prev from '@assets/images/PrevIcon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '~/src/config';
import {SelectContext, DocInfoContext} from '../../ReservationContext';

interface TimeTableProp {
  expired_times: string[];
  working_times: string[];
}
const DAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];
const TODAY = new Date();

const CHANGEWEEKS = [1, 2, 3, 4, 5, 6, 0];

function DocScheme({navigation}: DocSchemeNavigationProps) {
  const [calendarDate, setCalendarDate] = useState<NewDate[]>([]);
  const [date, setDate] = useState({
    year: TODAY.getFullYear(),
    month: TODAY.getMonth() + 1,
    date: TODAY.getDate(),
    day: TODAY.getDay(),
  });
  const [workingWeeks, setWorkingWeeks] = useState<number[]>([]);
  const [timeTable, setTimeTable] = useState<TimeTableProp>({
    expired_times: [],
    working_times: [],
  });

  const {selectDate, setSelectDate} = useContext(SelectContext);
  const {docInfo} = useContext(DocInfoContext);

  useEffect(() => {
    navigation.setOptions({
      title: '홍정의선생님',
      headerStyle: {shadowColor: 'white'},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    return String(token);
  };

  useEffect(() => {
    const nowCalDate: NewDate = getNewDate(new Date(date.year, date.month - 1));

    const fetchData = async () => {
      const response = await fetch(
        `${config.docScheme}/1?year=${nowCalDate.year}&month=${nowCalDate.month}`,
        {headers: {Authorization: await getToken()}},
      );
      if (response.status === 200) {
        const fetchResult = await response.json();
        return setWorkingWeeks(
          fetchResult.result.map((el: number) => CHANGEWEEKS[el]),
        );
      } else {
        Alert.alert('로그인을 다시 시도해주세요');
      }
    };

    fetchData();
    getAlldate();
  }, [date]);

  useEffect(() => {
    if (selectDate.date !== 0) {
      let timer: NodeJS.Timeout;
      timer = setTimeout(() => {
        const fetchData = async () => {
          const response = await fetch(
            `${config.docScheme}/1?year=${selectDate.year}&month=${selectDate.month}&dates=${selectDate.date}`,
            {headers: {Authorization: await getToken()}},
          );
          if (response.status === 200) {
            const fetchResult = await response.json();
            return setTimeTable(fetchResult);
          } else {
            Alert.alert('로그인을 다시 시도해주세요');
          }
        };

        fetchData();
      }, 600);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [selectDate]);

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

  const isTimePass = useCallback(
    (time: string) => {
      const limitHours: number = TODAY.getHours() + 1;
      const limitMinutes: number = TODAY.getMinutes();
      const timetableHours: number = Number(time.split(':')[0]);
      const timetableMinutes: number = Number(time.split(':')[1]);
      return (
        selectDate.year === today.year &&
        selectDate.month === today.month &&
        selectDate.date === today.date &&
        new Date(
          today.year,
          today.month,
          today.date,
          timetableHours,
          timetableMinutes,
        ) <=
          new Date(
            today.year,
            today.month,
            today.date,
            limitHours,
            limitMinutes,
          )
      );
    },
    [date.month, date.year],
  );

  const isTimeExpired = useCallback(
    (time: string) =>
      timeTable.expired_times.length !== 0 &&
      timeTable.expired_times.includes(time),
    [timeTable],
  );

  const renderItem = ({item}: {item: string}) =>
    item ? (
      <TimeButton
        disabled={isTimePass(item) || isTimeExpired(item)}
        onPress={() => goMakeREZ(item)}>
        <ButtonText disabled={isTimePass(item) || isTimeExpired(item)}>
          {item}
        </ButtonText>
      </TimeButton>
    ) : (
      <HiddenButton disabled></HiddenButton>
    );

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
              <WeekText invalid={workingWeeks.includes(idx)}>{day}</WeekText>
            </WeekButton>
          ))}
        </WeekInfo>
        <Calendar
          dayoff={workingWeeks}
          weeklength={calendarDate.length}
          calendarDate={calendarDate}
          today={today}
        />
      </SchemeWrapper>
      <TimeTable isShow={selectDate.date !== 0}>
        <TimeButtonWrapper
          renderItem={renderItem}
          data={
            timeTable.working_times.length % 3 === 2
              ? timeTable.working_times.concat('')
              : timeTable.working_times
          }
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          keyExtractor={(item: string, index: number) => index.toString()}
        />
        <TimeTableFooter>해당 시간은 현지시간 기준입니다</TimeTableFooter>
      </TimeTable>
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

const WeekText = styled.Text<{invalid: boolean}>`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({invalid}) =>
    invalid ? ({theme}) => theme.DOCSchemeCaloff : ({theme}) => theme.primary};
`;

const TimeTable = styled.View<{isShow: boolean}>`
  display: ${({isShow}) => (isShow ? 'flex' : 'none')};
  flex: 1;
  height: 360px;
  padding: 16px 19px 54px;
  background-color: ${({theme}) => theme.DOCSchemeTimeback};
`;

const TimeButtonWrapper = styled.FlatList`
  width: 100%;
  flex: 1;
  overflow: hidden; ;
` as unknown as typeof FlatList;

const TimeButton = styled.Pressable<{disabled: boolean}>`
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 31px;
  margin-top: 9px;
  background-color: ${({disabled}) =>
    disabled ? ({theme}) => theme.DOCSchemeTimeChkback : 'white'};
  border: 1px solid
    ${({disabled}) =>
      disabled
        ? ({theme}) => theme.DOCSchemeTimeChkBorder
        : ({theme}) => theme.DOCSchemeTimeBorder};
  border-radius: 4px;
`;

const ButtonText = styled.Text<{disabled: boolean}>`
  color: ${({disabled}) =>
    disabled
      ? ({theme}) => theme.DOCSchemeTimeChkFont
      : ({theme}) => theme.DOCSchemeTimeFont};
`;

const TimeTableFooter = styled.Text`
  margin-top: 10.5px;
  margin-left: 6px;
  color: ${({theme}) => theme.DOCSchemeFooter};
  font-size: 11px;
  line-height: 16.28px;
`;

const HiddenButton = styled(TimeButton)`
  opacity: 0;
`;
