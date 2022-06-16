import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import DoctorCard from '@components/DoctorCard';
import Symptom from './Symptom';
import DoctorOpinion from './DoctorOpinion';
import ImageView from './ImageView';
import Button from './Button';
import Status from '~/src/components/Status';
import {REZDetailNavigationProps} from '~/src/types/type';
import {
  DocInfoContext,
  SelectImageContext,
  SelectSymptomContext,
} from '~/src/ReservationContext';
import {getToken} from '~/src/AuthContext';
import {config} from '~/src/config';

function REZDetail({navigation}: REZDetailNavigationProps) {
  const {docInfo} = useContext(DocInfoContext);
  const {setSymptomText} = useContext(SelectSymptomContext);
  const {setSelectImage} = useContext(SelectImageContext);

  const [detailData, setDetailData] = useState({
    status: '진료대기',
    reservation: '',
    image: [{id: '', fileName: '', uri: ''}],
    symptom: '',
    doctorOpinion: '',
  });

  const goBackCalender = async () => {
    setSymptomText(detailData.symptom);
    setSelectImage(detailData.image);
    await navigation.navigate('DocScheme');
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${config.detail}?res_id=${docInfo.reservation_id}`, {
        headers: {
          Authorization: await getToken(),
        },
      })
        .then(res => res.json())
        .then(data => setDetailData(data.result));
    };
    fetchData();
    setSymptomText('');
    setSelectImage([]);
  }, []);

  return (
    <Container>
      <DoctorView>
        <DoctorCard docData={docInfo} />
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
      <Button
        navigation={navigation}
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

const StatusView = styled.View`
  position: absolute;
  right: 0;
  top: 0;
`;

const Section = styled.ScrollView`
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
