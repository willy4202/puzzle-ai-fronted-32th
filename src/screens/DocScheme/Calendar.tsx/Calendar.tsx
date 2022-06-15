import React, {useCallback, useContext} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import CalendarButton from '~/src/screens/DocScheme/CalendarButton.tsx/CalendarButton';
import {CalendarProps} from '~/src/types/type';
import {SelectContext} from '../../../ReservationContext';

function Calendar({calendarDate, today, workingDay}: CalendarProps) {
  const {selectDate} = useContext(SelectContext);

  const isDayValid = useCallback((date: Date) => {
    return date.getTime() < today.setHours(0, 0, 0, 0);
  }, []);

  const isDayChecked = useCallback(
    (date: Date) => {
      if (selectDate) {
        return date.getDate() === selectDate.getDate();
      } else {
        return false;
      }
    },
    [selectDate],
  );

  function renderItem({item}: {item: Date}): JSX.Element {
    return item ? (
      <CalendarButton
        isDayOff={isDayValid(item) || !workingDay.includes(item.getDay())}
        isChecked={isDayChecked(item)}
        dateInfo={item}>
        {item.getDate()}
      </CalendarButton>
    ) : (
      <CalendarButton isDayOff={true} isChecked={false} dateInfo={null}>
        {' '}
      </CalendarButton>
    );
  }

  return (
    <CalendarWrapper
      data={calendarDate}
      renderItem={renderItem}
      keyExtractor={(item: Date, index: number) => index.toString()}
      numColumns={7}
      columnWrapperStyle={{justifyContent: 'space-evenly'}}
    />
  );
}

export default Calendar;

const CalendarWrapper = styled.FlatList`
  flex: 1;
` as unknown as typeof FlatList;
