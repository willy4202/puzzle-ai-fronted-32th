import React, {useCallback, useContext, useState, useMemo} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, FlatList} from 'react-native';
import {TimeTableProp} from '~/src/types/type';
import {SelectContext} from '~/src/ReservationContext';
import useFetch from '~/src/components/useFetch';
import useDebounce from '~/src/components/useDebounce';
import {config} from '~/src/config';

function TimeTable({goMakeREZ}: {goMakeREZ: (item: string) => void}) {
  const [timeTable, setTimeTable] = useState<TimeTableProp>({
    expired_times: [],
    working_times: [],
  });

  const {selectDate} = useContext(SelectContext);

  const debounceValue = useDebounce<Date | null>(selectDate, 1000);

  const url = useMemo(() => {
    if (debounceValue) {
      return `${config.docScheme}/1?year=${debounceValue.getFullYear()}&month=${
        debounceValue.getMonth() + 1
      }&dates=${debounceValue.getDate()}`;
    } else {
      return '';
    }
  }, [debounceValue]);

  const {fetchData} = useFetch<TimeTableProp>(url, 'GET', 'TimeTable', null);

  const isTimePass = useCallback(
    (time: string) => {
      const timetableHours: number = Number(time.split(':')[0]);
      const timetableMinutes: number = Number(time.split(':')[1]);
      if (selectDate) {
        return (
          selectDate.getTime() === new Date().setHours(0, 0, 0, 0) &&
          new Date().setHours(timetableHours, timetableMinutes, 0, 0) <=
            Date.now() + 60 * 60 * 1000
        );
      }
    },
    [selectDate],
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
      <TimeTableFooter>?????? ????????? ???????????? ???????????????</TimeTableFooter>
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
