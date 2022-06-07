import React, {useState} from 'react';
import styled from 'styled-components/native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from 'App';
import DoctorCard from '@components/DoctorCard';
import Symptom from './Symptom';
import DoctorOpinion from './DoctorOpinion';
import ImageView from './ImageView';
import Button from './Button';
import {Text, View} from 'react-native';

type NavigationProps = StackScreenProps<HomeStackParamList, 'MakeREZ'>;

function REZDetail() {
  const [status, setStatus] = useState('진료대기');

  const testPress = () => {
    if (status === '진료대기') {
      setStatus('진료완료');
    } else if (status === '진료완료') {
      setStatus('진료취소');
    } else {
      setStatus('진료대기');
    }
  };

  return (
    <Container>
      <DoctorView>
        <DoctorCard />
        <StatusView onPress={testPress}>
          <Status status={status}>{status}</Status>
        </StatusView>
      </DoctorView>
      <Section>
        <DateView>
          <Title>예약 날짜 및 시간</Title>
          <Date>2020-07-24(금) 오후 3:00</Date>
        </DateView>
        <ImageView />
        <Symptom />
        <DoctorOpinion />
      </Section>
      <Button status={status} setStatus={setStatus} />
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
  position: relative;
  justify-content: center;
  margin: 20px 18px 0 18px;
`;

const StatusView = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
`;

const Status = styled.Text`
  background-color: yellow;
  padding: 2px 10px;
`;

const Section = styled.View`
  flex: 7;
  padding: 20px;
`;

const DateView = styled.View`
  margin-bottom: 20px;
`;

const Title = styled.Text`
  margin-bottom: 7px;
  color: ${({theme}) => theme.primary};
  font-size: ${({theme}) => theme.fontRegular};
`;

const Date = styled.Text`
  color: ${({theme}) => theme.REZDetailFont};
  font-size: ${({theme}) => theme.fontRegular};
`;
