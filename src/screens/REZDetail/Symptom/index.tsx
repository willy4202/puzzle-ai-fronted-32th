import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

type props = {
  symptomText: string;
};

const Symptom = ({symptomText}: props) => {
  return (
    <View>
      <Title>환자 증상</Title>
      <ContentText>{symptomText}</ContentText>
    </View>
  );
};

export default Symptom;

const Title = styled.Text`
  margin-bottom: 7px;
  color: ${({theme}) => theme.primary};
  font-size: ${({theme}) => theme.fontRegular};
  line-height: ${({theme}) => theme.lineHeightRegular};
`;

const ContentText = styled.Text`
  color: ${({theme}) => theme.REZDetailFont};
  font-size: ${({theme}) => theme.fontRegular};
  line-height: ${({theme}) => theme.lineHeightRegular};
`;
