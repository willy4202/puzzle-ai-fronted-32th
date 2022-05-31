import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

function TimeView() {
  return (
    <ViewContainer>
      <ViewTitle>예약시간</ViewTitle>
      <SelectTimeWrapper>
        <SelectTimeText>2020-07-24(금) 오후 3:00 </SelectTimeText>
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
  margin: 0 18px 0 18px;
`;

const SelectTimeWrapper = styled.View`
  justify-content: center;
  background-color: ${({theme}) => theme.MakeREZTimeBack};
  height: 60%;
  margin: 5px 18px 0 18px;
`;

const SelectTimeText = styled.Text`
  color: ${({theme}) => theme.MakeREZInputFont};
  margin-left: 10px;
`;
