import React, {useEffect, useState, useContext} from 'react';
import {Image, View} from 'react-native';
import styled from 'styled-components/native';
import {
  SelectSymptomContext,
  SelectImageContext,
} from '~/src/ReservationContext';
import checkIcon from '@assets/images/complete_icon.png';
import {REZSubmitNavigationProps} from '~/src/types/type';

interface DoctorType {
  doctorName: string;
  hospital: string;
  department: string;
}

const DOCTOR_MOCK = {
  doctorName: '최우식',
  hospital: '서울성모병원',
  department: '코로나19상담센터',
};

function REZSubmit({navigation}: REZSubmitNavigationProps) {
  const {symptomText} = useContext(SelectSymptomContext);
  const {selectImage} = useContext(SelectImageContext);
  const [formImg, setFormImg] = useState();
  const [doctorInfo, setDoctorInfo] = useState<DoctorType>();
  const [date, setDate] = useState('');

  useEffect(() => {
    setDoctorInfo(DOCTOR_MOCK);
  }, []);

  useEffect(() => {
    const today = new Date();
    const weekArray = ['일', '월', '화', '수', '목', '금', '토'];
    const currentDate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      today.getDate().toString().padStart(2, '0') +
      `(${weekArray[today.getDay()]})` +
      ' ' +
      today.toLocaleTimeString([], {timeStyle: 'short'});
    setDate(currentDate);
  }, []);

  useEffect(() => {
    const formData = new FormData();
    selectImage.map(picture => {
      const photo = {
        uri: picture.uri,
        type: 'multipart/form-data',
        name: picture.fileName,
      };
      formData.append('select Image', photo);
      setFormImg(formData);
    });
  }, [selectImage]);

  const test = async () => {
    fetch('server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        img: formImg,
        doctor: doctorInfo,
        symptom: symptomText,
        date: date,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
    console.log('post done');
    await navigation.navigate('Mains');
  };

  const goBackScreen = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Header>
        <Image source={checkIcon} />
        <HeaderText>진료 예약을 확정하시겠습니까?</HeaderText>
      </Header>

      <Body>
        <InfoContainer>
          <InfoTitle>담당의사</InfoTitle>
          {doctorInfo && (
            <REZInfo>
              {doctorInfo.doctorName} ({doctorInfo.hospital} / &nbsp;
              {doctorInfo.department})
            </REZInfo>
          )}
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>신청일시</InfoTitle>
          <REZInfo>{date}</REZInfo>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>예약일시</InfoTitle>
          {/* TODO : 예약 정보 받아오기*/}
          <REZInfo>2022-12-21(월) 오후 3:00</REZInfo>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>예약내용</InfoTitle>
          <REZInfo>
            {symptomText.length < 18
              ? symptomText
              : symptomText.slice(0, 17) + '...'}
          </REZInfo>
        </InfoContainer>
      </Body>
      <CautionInfoContainer>
        <CautionInfo>
          승인 완료 후 신청한 예약시간에 진료가 진행됩니다.{'\n'} 진료 1시간
          전의 예약은 취소가 불가합니다.
        </CautionInfo>
      </CautionInfoContainer>
      <Footer>
        <ConfirmBtn onPress={test}>
          <View>
            <BtnText>예약 확정</BtnText>
          </View>
        </ConfirmBtn>
        <ModifyBtn onPress={goBackScreen}>
          <BtnText>예약 수정</BtnText>
        </ModifyBtn>
      </Footer>
    </Container>
  );
}

export default REZSubmit;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
`;

const Header = styled.View`
  flex: 2;
  align-items: center;
  margin-top: 30%;
  margin-bottom: 10%;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.REZSubmitBorder};
  border-bottom-style: dotted;
`;

const HeaderText = styled.Text`
  margin: 28px 0 36px 0;
  color: ${({theme}) => theme.REZSubmitTitle};
  font-size: ${({theme}) => theme.fontMedium};
  line-height: ${({theme}) => theme.lineHeightLarge};
`;

const Body = styled.View`
  flex: 5;
  align-items: flex-start;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const InfoTitle = styled.Text`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({theme}) => theme.REZSubmitTitle};
  margin-right: 12px;
`;

const REZInfo = styled.Text`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({theme}) => theme.REZSubmitFont}; ;
`;

const CautionInfoContainer = styled.View`
  flex: 1;
`;

const CautionInfo = styled.Text`
  color: ${({theme}) => theme.REZSubmitFooter};
`;

const Footer = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: 5%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: white;
  font-size: ${({theme}) => theme.fontMedium};
`;

const ConfirmBtn = styled.TouchableOpacity`
  width: 60%;
  height: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({theme}) => theme.primary};
`;

const ModifyBtn = styled.TouchableOpacity`
  width: 37%;
  height: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({theme}) => theme.REZSubmitFont};
`;
