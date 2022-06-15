import React, {useContext, useMemo} from 'react';
import styled from 'styled-components/native';
import {SelectContext} from '~/src/ReservationContext';

function TimeView() {
  const {selectDate} = useContext(SelectContext);
  const TimeString: string = useMemo(() => {
    if (selectDate) {
      const dateArray: string[] = selectDate
        .toLocaleString([], {
          year: 'numeric',
          month: '2-digit',
          day: 'numeric',
          weekday: 'short',
        })
        .split('. ');
      return `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}${
        dateArray[3]
      } ${selectDate?.toLocaleTimeString([], {timeStyle: 'short'})}`;
    } else {
      return '';
    }
  }, [selectDate]);

  return (
    <ViewContainer>
      <ViewTitle>예약시간</ViewTitle>
      <SelectTimeWrapper>
        <SelectTimeText>{TimeString}</SelectTimeText>
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
