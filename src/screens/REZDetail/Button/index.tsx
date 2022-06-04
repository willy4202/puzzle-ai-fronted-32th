import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import React from 'react';

const Button = () => {
  return (
    <BtnWrapper>
      <ConfirmBtn>
        <View>
          <BtnText>예약 확정</BtnText>
        </View>
      </ConfirmBtn>
      <ModifyBtn>
        <BtnText>예약 수정</BtnText>
      </ModifyBtn>
    </BtnWrapper>
  );
};

export default Button;

const BtnWrapper = styled.View`
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
