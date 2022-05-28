import React, {ReactNode} from 'react';
import styled, {css} from 'styled-components/native';

interface Props {
  children: ReactNode;
  postData: () => void;
  id?: string;
}

interface PressableProps {
  id: string;
}

function LoginSignupBtn({children, id = '', postData}: Props) {
  return (
    <BtnContainer>
      <LoginBtn id={id} onPress={postData}>
        <LoginText id={id}>{children}</LoginText>
      </LoginBtn>
    </BtnContainer>
  );
}

export default LoginSignupBtn;

const BtnContainer = styled.View`
  flex: 1;
  top: 10px;
`;

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
