import React, {useContext} from 'react';
import styled, {css} from 'styled-components/native';
import {SelectSymptomContext, DocInfoContext} from '~/src/ReservationContext';
import DoctorCard from '@components/DoctorCard';
import TimeView from './TimeView';
import SymptomView from './SymptomView';
import ImagePicker from './ImagePicker';
import {MakeREZNavigationProps} from '~/src/types/type';
import {ScrollView} from 'react-native-gesture-handler';

function MakeREZ({navigation}: MakeREZNavigationProps) {
  const {symptomText} = useContext(SelectSymptomContext);
  const {docInfo} = useContext(DocInfoContext);

  const navigate = () => {
    navigation.push('REZSubmit');
  };

  return (
    <Container>
      <DoctorView>
        <DoctorCard docData={docInfo} />
      </DoctorView>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}>
        <TimeView />
        <SymptomView />
        <ImagePicker />
        <ButtonWrapper>
          <SubmitBtn onPress={navigate} disabled={!symptomText}>
            <BtnText>진료예약</BtnText>
          </SubmitBtn>
        </ButtonWrapper>
      </ScrollView>
    </Container>
  );
}

export default MakeREZ;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const DoctorView = styled.View`
  margin: 0 20px;
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
