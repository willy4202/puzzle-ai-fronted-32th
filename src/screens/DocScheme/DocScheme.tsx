import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import {FlatList} from 'react-native';
import styled, {css} from 'styled-components/native';
import {NewDate} from '~/src/types/type';
import {DocSchemeNavigationProps, SelectDateProp} from '~/src/types/type';
import DoctorCard from '@components/DoctorCard';
import Calendar from '@components/Calendar';
import Next from '@assets/images/NextIcon.png';
import Prev from '@assets/images/PrevIcon.png';
import {SelectContext, DocInfoContext} from '../../ReservationContext';

interface TIMESProp {
  id: string;
}
const DAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];
const TODAY = new Date();
const DAYOFF: string[] = ['1', '4', '6', '14', '16', '20', '22', '24', '25'];
const TIMES: TIMESProp[] = [
  {id: '05:20'},
  {id: '06:50'},
  {id: '07:00'},
  {id: '12:12'},
  {id: '14:00'},
  {id: '15:00'},
  {id: '16:50'},
  {id: '17:00'},
  {id: '18:55'},
  {id: '19:00'},
  {id: '20:00'},
  {id: '21:00'},
  {id: '22:00'},
  {id: '23:00'},
];

const FULL: string[] = ['10:00', '11:00', '12:00'];

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

  const isTimeValid = useCallback(
    (item: TIMESProp) => {
      const limitHours: number = TODAY.getHours() + 1;
      const limitMinutes: number = TODAY.getMinutes();
      const timetableHours: number = Number(item.id.split(':')[0]);
      const timetableMinutes: number = Number(item.id.split(':')[1]);
      return (
        new Date(
          today.year,
          today.month,
          today.date,
          timetableHours,
          timetableMinutes,
        ) <=
        new Date(today.year, today.month, today.date, limitHours, limitMinutes)
      );
    },
    [date],
  );

  const renderItem = ({item}: {item: TIMESProp}) =>
    item.id ? (
      <TimeButton
        disabled={
          (selectDate.date === today.date && isTimeValid(item)) ||
          FULL.includes(item.id)
        }
        onPress={() => goMakeREZ(item.id)}>
        <ButtonText
          disabled={
            (selectDate.date === today.date && isTimeValid(item)) ||
            FULL.includes(item.id)
          }>
          {item.id}
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
          {DAYS.map((day, idx) => (
            <WeekButton key={idx}>
              <WeekText>{day}</WeekText>
            </WeekButton>
          ))}
        </WeekInfo>
        <Calendar
          dayoff={DAYOFF}
          weeklength={calendarDate.length}
          calendarDate={calendarDate}
          today={today}
        />
      </SchemeWrapper>
      <TimeTable isShow={selectDate.date !== 0}>
        <TimeButtonWrapper
          renderItem={renderItem}
          data={TIMES.length % 3 === 2 ? TIMES.concat({id: ''}) : TIMES}
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          keyExtractor={(item: TIMESProp, index: number) => index.toString()}
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

const WeekText = styled.Text`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({theme}) => theme.primary};
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
