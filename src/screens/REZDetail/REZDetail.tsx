import React from 'react';
import styled from 'styled-components/native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from 'App';
import DoctorCard from '@components/DoctorCard';
import {View, Text} from 'react-native';
import Symptom from './Symptom';
import DoctorOpinion from './DoctorOpinion';
import ImageView from './ImageView';
import Button from './Button';

type NavigationProps = StackScreenProps<HomeStackParamList, 'MakeREZ'>;

function REZDetail() {
  return (
    <Container>
      <DoctorView>
        <DoctorCard />
      </DoctorView>
      <Section>
        <DateView>
          <Title>예약 날짜 및 시간</Title>
          <ContentText>2020-07-24(금) 오후 3:00</ContentText>
        </DateView>
        <ImageView />
        <Symptom />
        <DoctorOpinion />
      </Section>
      <Button />
    </Container>
  );
}

export default REZDetail;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const DoctorView = styled.View`
  flex: 1;
  justify-content: center;
  margin: 20px 18px 0 18px;
`;

const Section = styled.View`
  flex: 7;
  margin: 0 18px 0 18px;
`;

const DateView = styled.View`
  margin: 20px 0 20px 0;
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
