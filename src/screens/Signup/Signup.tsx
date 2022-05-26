import React, {useEffect} from 'react';
import styled from 'styled-components/native';
<<<<<<< HEAD
import {View, Platform} from 'react-native';
=======
import {View} from 'react-native';
>>>>>>> bdab8948d0b5cc06d8ef45745faecb90fb34377b
import InputWrapper from '../../components/InputWrapper';
import PasswordWrapper from '../../components/PasswordWrapper';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../App';

type SignupNavigationProps = StackScreenProps<HomeStackParamList, 'Signup'>;

function Signup({navigation}: SignupNavigationProps) {
<<<<<<< HEAD
  console.log(navigation);
=======
>>>>>>> bdab8948d0b5cc06d8ef45745faecb90fb34377b
  useEffect(() => {
    navigation.setOptions({
      title: '회원가입',
      headerStyle: {shadowColor: 'white'},
<<<<<<< HEAD
      headerTitleAlign: 'center',
=======
>>>>>>> bdab8948d0b5cc06d8ef45745faecb90fb34377b
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
<<<<<<< HEAD
  flex: 1;
  margin-right: 10px;
`;

const FirstName = styled(LastName)`
  margin-right: 0;
`;
=======
  width: 145px;
`;

const FirstName = styled(LastName)``;
>>>>>>> bdab8948d0b5cc06d8ef45745faecb90fb34377b

const LastNameWrapper = styled(InputWrapper)``;

const FirstNameWrapper = styled(InputWrapper)``;

const EmailInput = styled(InputWrapper)``;

const PasswordInput = styled(PasswordWrapper)``;

const PasswordCheckInput = styled(PasswordWrapper)``;
