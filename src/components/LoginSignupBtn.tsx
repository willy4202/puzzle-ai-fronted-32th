import React, {ReactNode} from 'react';
import styled, {css} from 'styled-components/native';

interface Props {
  children: ReactNode;
  pressHandler: () => void;
  id?: 'Login' | 'Signup';
}

interface PressableProps {
  id: string;
}

function LoginSignupBtn({children, id = 'Login', pressHandler}: Props) {
  return (
    <LoginBtn id={id} onPress={pressHandler}>
      <LoginText id={id}>{children}</LoginText>
    </LoginBtn>
  );
}

export default LoginSignupBtn;

const LoginBtn = styled.Pressable<PressableProps>`
  width: 300px;
  height: 52px;
  border-radius: 8px;
  align-self: center;
  justify-content: center;
  align-items: center;
  ${({id}) => {
    switch (id) {
      case 'Signup':
        return css`
          background-color: white;
          color: ${({theme}) => theme.primary};
          border: 1px solid ${({theme}) => theme.primary};
        `;
      default:
        return css`
          background-color: ${({theme}) => theme.primary};
        `;
    }
  }}
`;

const LoginText = styled.Text<{id: string}>`
  font-size: ${({theme}) => theme.fontMedium};
  line-height: ${({theme}) => theme.lineHeightLarge};
  color: ${({id}) => (id === 'Signup' ? ({theme}) => theme.primary : 'white')};
`;
