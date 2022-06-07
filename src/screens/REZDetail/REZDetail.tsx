import React, {useContext, useState} from 'react';
import styled, {css} from 'styled-components/native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from 'App';
import DoctorCard from '@components/DoctorCard';
import Symptom from './Symptom';
import DoctorOpinion from './DoctorOpinion';
import ImageView from './ImageView';
import Button from './Button';
import Status from '~/src/components/Status';

type NavigationProps = StackScreenProps<HomeStackParamList, 'REZDetail'>;

function REZDetail({navigation}: NavigationProps) {
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

  const goBackCalender = () => {
    navigation.navigate('DocScheme');
  };

  return (
    <Container>
      <DoctorView>
        <DoctorCard />
        {/* TEST : 임시로 스테이터스 변동하는 함수 */}
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
        {status === '진료완료' && <DoctorOpinion />}
      </Section>
      {/* TODO : status 상황에 따라 매번 다른 기능을 수행하는 버튼 구현 */}
      <Button
        goBackCalender={goBackCalender}
        status={status}
        setStatus={setStatus}
      />
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
