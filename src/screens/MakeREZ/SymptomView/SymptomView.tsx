import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

function SymptomView() {
  return (
    <ViewContainer>
      <ViewTitle>증상 입력</ViewTitle>
      <View>
        <SymptomInput multiline={true} placeholder="증상을 입력해주세요" />
      </View>
    </ViewContainer>
  );
}

export default SymptomView;

const ViewContainer = styled.View`
  flex: 3;
  margin-top: 15px;
`;

const ViewTitle = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: ${({theme}) => theme.fontRegular};
  line-height: ${({theme}) => theme.lineHeightRegular};
  margin: 0 18px 0 18px;
`;

const SymptomInput = styled.TextInput`
  height: 90%;
  color: ${({theme}) => theme.MakeREZInputFont};
  background-color: ${({theme}) => theme.MakeREZTimeBack};
  margin: 5px 18px 0 18px;
  padding: 10px;
`;
