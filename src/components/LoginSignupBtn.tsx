import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {Alert} from 'react-native';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  pressHandler: () => void;
}

function LoginSignupBtn({children, pressHandler, disabled = false}: Props) {
  return (
    <BtnContainer>
      <LoginBtn disabled={disabled} onPress={() => pressHandler()}>
        <LoginText>{children}</LoginText>
      </LoginBtn>
    </BtnContainer>
  );
}

export default LoginSignupBtn;

const BtnContainer = styled.View`
  flex: 1;
  top: 10px;
`;

const LoginBtn = styled.Pressable`
  width: 300px;
  height: 52px;
  border-radius: 8px;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: ${({disabled}) =>
    disabled ? ({theme}) => theme.grey : ({theme}) => theme.primary};
`;

const LoginText = styled.Text`
  font-size: ${({theme}) => theme.fontMedium};
  line-height: ${({theme}) => theme.lineHeightLarge};
  color: white;
`;
