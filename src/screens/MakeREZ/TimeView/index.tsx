import React, {useContext, useMemo} from 'react';
import styled from 'styled-components/native';
import {SelectContext} from '~/src/ReservationContext';

function TimeView() {
  const {selectDate} = useContext(SelectContext);

  const getTime: Date = useMemo(
    () =>
      new Date(
        selectDate.year,
        selectDate.month,
        selectDate.date,
        Number(selectDate.time.split(':')[0]),
        Number(selectDate.time.split(':')[1]),
      ),
    [],
  );

  return (
    <ViewContainer>
      <ViewTitle>예약시간</ViewTitle>
      <SelectTimeWrapper>
        <SelectTimeText>
          {String(selectDate.year).padStart(2, '0')}-
          {String(selectDate.month).padStart(2, '0')}-
          {String(selectDate.date).padStart(2, '0')}({selectDate.day})
          {getTime.toLocaleTimeString([], {timeStyle: 'short'})}
        </SelectTimeText>
      </SelectTimeWrapper>
    </ViewContainer>
  );
}

export default TimeView;

const ViewContainer = styled.View`
  flex: 1;
`;
const ViewTitle = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: ${({theme}) => theme.fontRegular};
  line-height: ${({theme}) => theme.lineHeightRegular};
  margin: 5px 20px;
`;

const SelectTimeWrapper = styled.View`
  justify-content: center;
  background-color: ${({theme}) => theme.MakeREZTimeBack};
  height: 60%;
  margin: 5px 20px;
`;

const SelectTimeText = styled.Text`
  color: ${({theme}) => theme.MakeREZInputFont};
  margin-left: 10px;
`;
