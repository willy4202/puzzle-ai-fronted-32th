import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {View, Platform} from 'react-native';
import InputWrapper from '../../components/InputWrapper';
import PasswordWrapper from '../../components/PasswordWrapper';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../App';

type SignupNavigationProps = StackScreenProps<HomeStackParamList, 'Signup'>;

function Signup({navigation}: SignupNavigationProps) {
  useEffect(() => {
    navigation.setOptions({
      title: '회원가입',
      headerStyle: {shadowColor: 'white'},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (
    <SignupWrapper>
      <NameWrapper>
        <LastName>
          <LastNameWrapper>성</LastNameWrapper>
        </LastName>
        <FirstName>
          <FirstNameWrapper>이름</FirstNameWrapper>
        </FirstName>
      </NameWrapper>
      <EmailInput>이메일</EmailInput>
      <PasswordInput>비밀번호</PasswordInput>
      <PasswordCheckInput type="check">비밀번호 확인</PasswordCheckInput>
    </SignupWrapper>
  );
}

export default Signup;

const SignupWrapper = styled.View`
  width: 100%;
  height: 100%;
  padding: 40px 27px 60px 33px;
  background-color: white;
`;

const NameWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const LastName = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const FirstName = styled(LastName)`
  margin-right: 0;
`;

const LastNameWrapper = styled(InputWrapper)``;

const FirstNameWrapper = styled(InputWrapper)``;

const EmailInput = styled(InputWrapper)``;

const PasswordInput = styled(PasswordWrapper)``;

const PasswordCheckInput = styled(PasswordWrapper)``;
