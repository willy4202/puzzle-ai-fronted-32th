import React, {useState} from 'react';
import styled from 'styled-components/native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '~/../App';
import {Text, TextInput, View} from 'react-native';
import DoctorCard from '~/components/DoctorCard';

type NavigationProps = StackScreenProps<HomeStackParamList, 'MakeREZ'>;

function MakeREZ() {
  return (
    <Container>
      <DoctorView>
        <DoctorCard />
      </DoctorView>
      <TimeView>
        <ViewTitle>예약시간</ViewTitle>
        <SelectTimeWrapper>
          <SelectTimeText>2020-07-24(금) 오후 3:00 </SelectTimeText>
        </SelectTimeWrapper>
      </TimeView>
      <SymptomView>
        <ViewTitle>증상 입력</ViewTitle>
        <View>
          <SymptomInput multiline={true} placeholder="증상을 입력해주세요" />
        </View>
      </SymptomView>
      <ImageView>
        <ViewTitle>환부 사진 업로드(선택)</ViewTitle>
        <View>
          <TextInput>imagePicker</TextInput>
        </View>
      </ImageView>
      <ButtonWrapper>
        <Text>hi</Text>
      </ButtonWrapper>
    </Container>
  );
}

export default MakeREZ;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const DoctorView = styled.View`
  margin: 5% 0 0 4%;
  flex: 1;
`;

const TimeView = styled.View`
  flex: 1;
`;

const SymptomView = styled.View`
  flex: 3;

  margin-top: 15px;
`;

const ImageView = styled.View`
  flex: 2;
  background-color: red;
`;

const ButtonWrapper = styled.View`
  flex: 1;
  background-color: yellow;
`;

const ViewTitle = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: ${({theme}) => theme.fontRegular};
  line-height: ${({theme}) => theme.lineHeightRegular};
  margin: 0 18px 0 18px;
`;

const SelectTimeWrapper = styled.View`
  justify-content: center;
  background-color: ${({theme}) => theme.MakeREZTimeBack};
  height: 60%;
  margin: 5px 18px 0 18px;
`;

const SelectTimeText = styled.Text`
  color: ${({theme}) => theme.MakeREZInputFont};
  margin-left: 10px;
`;

const SymptomInput = styled.TextInput`
  height: 90%;
  color: ${({theme}) => theme.MakeREZInputFont};
  background-color: ${({theme}) => theme.MakeREZTimeBack};
  margin: 5px 18px 0 18px;
  padding: 10px;
`;
