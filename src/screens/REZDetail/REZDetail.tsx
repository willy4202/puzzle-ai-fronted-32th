import React, {useContext, useEffect, useState} from 'react';
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

interface ImgType {
  id: number;
  fileName: string;
  uri: string;
}
interface MOCKTYPE {
  status: string;
  reservation: string;
  symptom: string;
  doctorOpinion: string;
  image: ImgType[];
}

const MOCK_DATA: MOCKTYPE = {
  status: '진료완료',
  reservation: '2020-04-14(금) 오후 2:00',
  image: [
    {
      id: 1,
      fileName: 'hhi',
      uri: 'https://www.medical.or.kr/center/images/suwon.jpg',
    },
    {
      id: 2,
      fileName: 'fwefc',
      uri: 'https://www.medigatenews.com/file/news/81993',
    },
    {
      id: 3,
      fileName: 'jyrs',
      uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202103/08/18f30524-01ea-4961-b160-33d642de086f.jpg',
    },
  ],
  symptom: '지난 금요일 발목을 접지른 이후...',
  doctorOpinion:
    '발목쪽 인대파열이 예상됩니다. 정확한 진단은 육안으로 확인 후 진단내려야 하지만 우선은 냉찜질 해주는것을 추천드립니다.',
};

function REZDetail({navigation}: NavigationProps) {
  const [status, setStatus] = useState('');
  const [image, setImage] = useState([]);
  const [symptomText, setSymptomText] = useState('');
  const [docOpinion, setDocOpinion] = useState('');

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

  useEffect(() => {
    setStatus(MOCK_DATA.status);
    setSymptomText(MOCK_DATA.symptom);
    setDocOpinion(MOCK_DATA.doctorOpinion);
    setImage(MOCK_DATA.image);
  }, []);

  return (
    <Container>
      <DoctorView>
        <DoctorCard />
        {/* TODO : 임시로 스테이터스 변동하는 스타일링 적용, fetch 체크 예정 */}
        <StatusView onPress={testPress}>
          <Status status={status}>{status}</Status>
        </StatusView>
      </DoctorView>
      <Section>
        <DateView>
          <Title>예약 날짜 및 시간</Title>
          <Date>2020-07-24(금) 오후 3:00</Date>
        </DateView>
        <ImageView image={image} />
        <Symptom symptomText={symptomText} />
        <DoctorOpinion docOpinion={docOpinion} />
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
