import React, {ReactNode} from 'react';
import styled from 'styled-components/native';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  pressHandler: () => void;
}

function LoginSignupBtn({children, pressHandler, disabled = false}: Props) {
  return (
    <LoginBtn disabled={disabled} onPress={() => pressHandler()}>
      <LoginText>{children}</LoginText>
    </LoginBtn>
  );
}

export default LoginSignupBtn;

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
