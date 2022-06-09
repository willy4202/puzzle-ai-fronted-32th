import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import DoctorCard from '@components/DoctorCard';
import Symptom from './Symptom';
import DoctorOpinion from './DoctorOpinion';
import ImageView from './ImageView';
import Button from './Button';
import Status from '~/src/components/Status';
import {REZDetailNavigationProps} from '~/src/types/type';
import {DocInfoContext} from '~/src/ReservationContext';
import {getToken} from '~/src/AuthContext';

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
  status: '진료대기',
  reservation: '2020-04-14(금) 오후 2:00',
  symptom: '지난 금요일 발목을 접지른 이후...',
  doctorOpinion:
    '발목쪽 인대파열이 예상됩니다. 정확한 진단은 육안으로 확인 후 진단내려야 하지만 우선은 냉찜질 해주는것을 추천드립니다.',
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
};

function REZDetail({navigation}: REZDetailNavigationProps) {
  const {docInfo} = useContext(DocInfoContext);
  const [detailData, setDetailData] = useState({
    status: '진료대기',
    reservation: '',
    image: [{id: '', fileName: '', uri: ''}],
    symptom: '',
    doctorOpinion: '',
  });

  //TODO : PARAMS 적용 하기, 해당 예약에 대한 id를 받아와서 뿌려주기

  const goBackCalender = () => {
    navigation.navigate('DocScheme');
  };

  // 통신 이후 spread 로직
  useEffect(() => {
    // 토큰 담아서 전송하는 로직
    const fetchData = async () => {
      fetch('server', {
        headers: {
          Authorization: await getToken(),
        },
      })
        .then(res => res.json())
        .then(res => setDetailData(res));
    };
    setDetailData(MOCK_DATA);

    // fetchData();
  }, []);

  return (
    <Container>
      <DoctorView>
        <DoctorCard docData={docInfo} />
        {/* TODO : 임시로 스테이터스 변동하는 스타일링 적용, fetch 체크 예정 */}
        <StatusView>
          <Status>{detailData.status}</Status>
        </StatusView>
      </DoctorView>
      <Section>
        <DateView>
          <Title>예약 날짜 및 시간</Title>
          <Date>2020-07-24(금) 오후 3:00</Date>
        </DateView>
        <ImageView image={detailData.image} />
        <Symptom symptomText={detailData.symptom} />
        <DoctorOpinion docOpinion={detailData.doctorOpinion} />
      </Section>
      {/* TODO : status 상황에 따라 매번 다른 기능을 수행하는 버튼 구현 */}
      <Button
        goBackCalender={goBackCalender}
        status={detailData.status}
        setDetailData={setDetailData}
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
