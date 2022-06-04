import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const DoctorOpinion = () => {
  return (
    <Article>
      <Title>의사 소견</Title>
      <ContentText>
        발목쪽 인대파열이 예상됩니다. 정확한 진단은 육안으로 확인 후 진단내려야
        하지만 우선은 냉찜질 해주는것을 추천드립니다.
      </ContentText>
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
`;

const ContentText = styled.Text`
  color: ${({theme}) => theme.REZDetailFont};
  font-size: ${({theme}) => theme.fontRegular};
`;
