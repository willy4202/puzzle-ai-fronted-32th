import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
  SelectImageContext,
  SelectSymptomContext,
} from '~/src/ReservationContext';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from 'App';
import DoctorCard from '@components/DoctorCard';

import {Asset} from 'react-native-image-picker';
import {View, Text} from 'react-native';

type NavigationProps = StackScreenProps<HomeStackParamList, 'MakeREZ'>;

function REZDetail() {
  const [symptomText, setSymptomText] = useState('');
  const [selectImage, setSelectImage] = useState<Asset[]>([]);

  return (
    <SelectSymptomContext.Provider value={{symptomText, setSymptomText}}>
      <SelectImageContext.Provider value={{selectImage, setSelectImage}}>
        <Container>
          <DoctorView>
            <DoctorCard />
          </DoctorView>
          <Section>
            <Article>
              <Title>예약 날짜 및 시간</Title>
              <ContentText>2020-07-24(금) 오후 3:00</ContentText>
            </Article>
            <Article>
              <Title>환부 사진</Title>
              <Text>hi</Text>
            </Article>
            <Article>
              <Title>환자 증상</Title>
              <ContentText>
                지난 금요일 발목을 접지른 이후 해당부위가 심하게 부어오르고 걸을
                때 마다 통증이 동반됩니다
              </ContentText>
            </Article>
            <Article>
              <Title>의사 소견</Title>
              <ContentText>
                발목쪽 인대파열이 예상됩니다. 정확한 진단은 육안으로 확인 후
                진단내려야 하지만 우선은 냉찜질 해주는것을 추천드립니다.
              </ContentText>
            </Article>
          </Section>
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
      </SelectImageContext.Provider>
    </SelectSymptomContext.Provider>
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
  margin: 30px 18px 0 18px;
`;

const Article = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${({theme}) => theme.primary};
`;

const ContentText = styled.Text`
  color: ${({theme}) => theme.REZDetailFont};
`;

const Footer = styled.View`
  flex: 1;
  margin: 0 18px 30px 18px;
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
