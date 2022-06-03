import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styled from 'styled-components/native';
import checkIcon from '@assets/images/complete_icon.png';

function REZSubmit() {
  return (
    <Container>
      <Header>
        <Image source={checkIcon} />
        <HeaderText>진료 예약을 확정하시겠습니까?</HeaderText>
      </Header>

      <Body>
        <InfoContainer>
          <InfoTitle>담당의사</InfoTitle>
          <REZInfo>최우식 (서울성모병원 / 코로나19상담센터)</REZInfo>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>신청일시</InfoTitle>
          {/* 예약 확정버튼 누르는 순간 시간 기록하기 */}
          <REZInfo>2020-12-18(금) 오후 1:13</REZInfo>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>예약일시</InfoTitle>
          {/* TODO : 예약 정보 받아오기*/}
          <REZInfo>2020-12-21(월) 오후 3:00</REZInfo>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>예약내용</InfoTitle>
          {/* TODO : 텍스트 일정 길이 이상이면 ...처리하기 */}
          <REZInfo>지난 금요일 발목을 접지른 이후 …</REZInfo>
        </InfoContainer>
      </Body>
      <CautionInfoContainer>
        <CautionInfo>
          승인 완료 후 신청한 예약시간에 진료가 진행됩니다.{'\n'} 진료 1시간
          전의 예약은 취소가 불가합니다.
        </CautionInfo>
      </CautionInfoContainer>
      <Footer>
        <ConfirmBtn>
          <View>
            <BtnText>예약 확정</BtnText>
          </View>
        </ConfirmBtn>
        <ModifyBtn>
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
    color: ${({theme}) => theme.REZSubmitFooter}; ;s
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
