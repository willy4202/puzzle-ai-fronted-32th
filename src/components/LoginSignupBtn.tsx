import React from 'react';
import styled from 'styled-components/native';
import {Alert} from 'react-native';

function LoginSignupBtn() {
  return (
    <BtnContainer>
      <LoginBtn onPress={() => Alert.alert('onPress 테스트 코드')}>
        <LoginText>로그인</LoginText>
      </LoginBtn>
    </BtnContainer>
  );
}

export default LoginSignupBtn;

const BtnContainer = styled.View`
  flex: 1;
`;

const LoginBtn = styled.Pressable`
  width: 300px;
  height: 52px;
  border-radius: 8px;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.primary};
`;

const LoginText = styled.Text`
  font-size: ${({theme}) => theme.fontMedium};
  line-height: ${({theme}) => theme.lineHeightLarge};
  color: white;
`;
