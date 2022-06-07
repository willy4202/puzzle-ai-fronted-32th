import React from 'react';
import styled from 'styled-components/native';
import logo from 'assets/images/logo.png';
import LoginSignupBtn from '@components/LoginSignupBtn';
import {EntryNavigationProps} from '~/src/types/type';

function Entry({navigation}: EntryNavigationProps) {
  const navigateHandler = (path: 'Login' | 'Signup') => {
    navigation.navigate(path);
  };

  return (
    <EntryWrapper>
      <LogoView>
        <Logo source={logo} />
      </LogoView>
      <ButtonWrapper>
        <LoginButton
          pressHandler={() => {
            navigateHandler('Login');
          }}
          id="Login">
          로그인
        </LoginButton>
        <SignupButton
          pressHandler={() => {
            navigateHandler('Signup');
          }}
          id="Signup">
          회원가입
        </SignupButton>
      </ButtonWrapper>
    </EntryWrapper>
  );
}

export default Entry;

const EntryWrapper = styled.View`
  flex: 1;
  padding: 20px 30px 30px;
  background-color: white;
`;

const LogoView = styled.View`
  flex: 5;
  align-self: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 156.8px;
  height: 60px;
`;

const ButtonWrapper = styled.View`
  flex: 1;
`;
const LoginButton = styled(LoginSignupBtn)``;

const SignupButton = styled(LoginSignupBtn)``;
