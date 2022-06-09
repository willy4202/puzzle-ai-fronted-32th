import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

type props = {
  docOpinion: string;
};

const DoctorOpinion = ({docOpinion}: props) => {
  return (
    <Article>
      <Title>의사 소견</Title>
      <ContentText>{docOpinion}</ContentText>
    </Article>
  );
};

export default DoctorOpinion;

const Article = styled.View`
  flex: 1;
  margin-top: 20px;
`;

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
