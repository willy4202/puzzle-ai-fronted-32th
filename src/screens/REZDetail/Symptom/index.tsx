import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const Symptom = () => {
  return (
    <View>
      <Title>환자 증상</Title>
      <ContentText>
        지난 금요일 발목을 접지른 이후 해당부위가 심하게 부어오르고 걸을 때 마다
        통증이 동반됩니다
      </ContentText>
    </View>
  );
};

export default Symptom;

const Title = styled.Text`
  margin-bottom: 7px;
  color: ${({theme}) => theme.primary};
  font-size: ${({theme}) => theme.fontRegular};
`;

const ContentText = styled.Text`
  color: ${({theme}) => theme.REZDetailFont};
  font-size: ${({theme}) => theme.fontRegular};
`;
