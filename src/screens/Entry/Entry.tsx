import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import logo from 'assets/images/logo.png';
import LoginSignupBtn from '~/components/LoginSignupBtn';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../App';

type SignupNavigationProps = StackScreenProps<HomeStackParamList, 'Entry'>;

function Entry({navigation}: SignupNavigationProps) {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {shadowColor: 'white'},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (
    <ViewContainer>
      <LogoView>
        <Logo source={logo} />
      </LogoView>
      <BtnWrapper>
        <BtnContainer>
          <LoginSignupBtn>로그인</LoginSignupBtn>
        </BtnContainer>
        <BtnContainer>
          <LoginSignupBtn>회원가입</LoginSignupBtn>
        </BtnContainer>
      </BtnWrapper>
    </ViewContainer>
  );
}

export default Entry;

const ViewContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LogoView = styled.View`
  flex: 4;
  align-self: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 156.8px;
  height: 60px;
`;

const BtnWrapper = styled.View`
  flex: 1;
  margin-bottom: 15%;
`;

const BtnContainer = styled.View`
  flex: 1;
  margin-top: 10px;
`;
