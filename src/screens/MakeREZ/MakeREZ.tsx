import React, {useState} from 'react';
import styled, {css} from 'styled-components/native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from 'App';
import DoctorCard from '@components/DoctorCard';
import TimeView from './TimeView';
import SymptomView from './SymptomView';
import ImagePicker from './ImagePicker';

type NavigationProps = StackScreenProps<HomeStackParamList, 'MakeREZ'>;

function MakeREZ() {
  const [symptomText, setSymptomText] = useState('');

  const postData = () => {
    console.log('증상', symptomText);
  };

  return (
    <Container>
      <DoctorView>
        <DoctorCard />
      </DoctorView>
      <TimeView />
      <SymptomView symptomText={symptomText} setSymptomText={setSymptomText} />
      <ImagePicker />
      <ButtonWrapper>
        <SubmitBtn onPress={postData} disabled={!symptomText}>
          <BtnText>진료예약</BtnText>
        </SubmitBtn>
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

const ButtonWrapper = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 15px;
`;

const SubmitBtn = styled.TouchableOpacity<{disabled: boolean}>`
  width: 100%;
  height: 52px;
  border-radius: 8px;
  align-self: center;
  justify-content: center;
  align-items: center;
  ${({disabled}) => {
    if (disabled) {
      return css`
        background-color: ${({theme}) => theme.ButtonDisable};
      `;
    } else {
      return css`
        background-color: ${({theme}) => theme.primary}; ;
      `;
    }
  }}
`;

const BtnText = styled.Text`
  color: white;
  font-size: ${({theme}) => theme.fontMedium};
  line-height: ${({theme}) => theme.lineHeightLarge};
  font-weight: ${({theme}) => theme.weightRegular};
`;
