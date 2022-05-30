import React, {ReactNode} from 'react';
import styled, {css} from 'styled-components/native';

interface Props {
  children: ReactNode;
  pressHandler: () => void;
  id?: 'Login' | 'Signup';
  disabled?: boolean;
}

interface PressableProps {
  id: string;
  disabled: boolean;
}

function LoginSignupBtn({
  children,
  disabled = false,
  id = 'Login',
  pressHandler,
}: Props) {
  return (
    <LoginBtn id={id} disabled={disabled} onPress={() => pressHandler()}>
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
          margin-top: 15px;
        `;
      default:
        return css<{disabled: boolean}>`
          background-color: ${({disabled}) =>
            disabled ? ({theme}) => theme.grey : ({theme}) => theme.primary}; ;
        `;
    }
  }}
`;

const LoginText = styled.Text<{id: string}>`
  font-size: ${({theme}) => theme.fontMedium};
  line-height: ${({theme}) => theme.lineHeightLarge};
  color: ${({id}) => (id === 'Signup' ? ({theme}) => theme.primary : 'white')};
`;
