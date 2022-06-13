import React, {useCallback, useContext, useMemo} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, FlatList} from 'react-native';
import {TimeTableProp, SelectDateProp} from '~/src/types/type';
import {SelectContext} from '~/src/ReservationContext';
import useFetch from '~/src/components/useFetch';
import useDebounce from '~/src/components/useDebounce';
import {config} from '~/src/config';

function TimeTable({
  goMakeREZ,
  date,
}: {
  goMakeREZ: (item: string) => void;
  date: {year: number; month: number; date: number; day: number};
}) {
  const {selectDate} = useContext(SelectContext);

  const debounceValue = useDebounce<SelectDateProp>(selectDate, 1000);

  const url = useMemo(() => {
    return `${config.docScheme}/1?year=${debounceValue.year}&month=${debounceValue.month}&dates=${debounceValue.date}`;
  }, [debounceValue.date]);

  const {fetchData} = useFetch<TimeTableProp>(url, 'GET', 'TimeTable', null);

  const isTimePass = useCallback(
    (time: string) => {
      const limitHours: number = new Date().getHours() + 1;
      const limitMinutes: number = new Date().getMinutes();
      const timetableHours: number = Number(time.split(':')[0]);
      const timetableMinutes: number = Number(time.split(':')[1]);
      return (
        selectDate.year === new Date().getFullYear() &&
        selectDate.month === new Date().getMonth() &&
        selectDate.date === new Date().getDate() &&
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          timetableHours,
          timetableMinutes,
        ) <=
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            limitHours,
            limitMinutes,
          )
      );
    },
    [date.month, date.year],
  );

  const isTimeExpired = useCallback(
    (time: string) =>
      fetchData.expired_times.length !== 0 &&
      fetchData.expired_times.includes(time),
    [fetchData],
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
    <TimeTableWrapper>
      {fetchData.working_times ? (
        <TimeButtonWrapper
          renderItem={renderItem}
          data={
            fetchData.working_times.length % 3 === 2
              ? fetchData.working_times.concat('')
              : fetchData.working_times
          }
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          keyExtractor={(item: string, index: number) => index.toString()}
        />
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
      <TimeTableFooter>해당 시간은 현지시간 기준입니다</TimeTableFooter>
    </TimeTableWrapper>
  );
}

export default TimeTable;

const TimeTableWrapper = styled.View`
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
