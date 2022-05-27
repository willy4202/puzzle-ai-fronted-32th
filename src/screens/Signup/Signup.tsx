import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import InputWrapper from '../../components/InputWrapper';
import PasswordWrapper from '../../components/PasswordWrapper';
import {Data} from '~/types/type';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../App';
import LoginSignupBtn from '@components/LoginSignupBtn';

type SignupNavigationProps = StackScreenProps<HomeStackParamList, 'Signup'>;

function Signup({navigation}: SignupNavigationProps) {
  const [inputData, setInputData] = useState<Data>({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: '회원가입',
      headerStyle: {shadowColor: 'white'},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!!inputData.email) {
      timer = setTimeout(() => {
        fetch(`http://3.39.118.217:8080/users/email_check`, {
          method: 'POST',
          body: JSON.stringify({
            email: inputData.email,
          }),
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if (res.message === 'email validation pass') {
              setIsEmailValid(true);
            } else {
              setIsEmailValid(false);
            }
          });
      }, 800);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [inputData.email]);

  const isNameValid: boolean = !!inputData.firstName && !!inputData.lastName;

  const isPwValid: boolean =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,}$/.test(
      inputData.password,
    );

  const isCheckpwValid: boolean =
    inputData.password === inputData.passwordCheck;

  const isButtonOn: boolean =
    isNameValid && isEmailValid && isPwValid && isCheckpwValid;

  const postData = () => {
    fetch(`http://3.39.118.217:8080/users/signup`, {
      method: 'POST',
      body: JSON.stringify({
        name: inputData.lastName + inputData.firstName,
        email: inputData.email,
        password: inputData.password,
        is_doctor: 'False',
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'signup success') {
          return Alert.alert('회원가입에 성공하셨습니다.');
        } else if (res.message === 'not in email') {
          return Alert.alert('이메일형식이 잘못되었습니다.');
        }
      });
  };

  return (
    <SignupWrapper>
      <ScrollWrapper>
        <NameWrapper>
          <LastName>
            <LastNameWrapper type="lastName" setInputData={setInputData}>
              성
            </LastNameWrapper>
          </LastName>
          <FirstName>
            <FirstNameWrapper type="firstName" setInputData={setInputData}>
              이름
            </FirstNameWrapper>
          </FirstName>
        </NameWrapper>
        <EmailInput type="email" setInputData={setInputData}>
          이메일
        </EmailInput>
        {!isEmailValid && (
          <EmailErrorMsg>존재하는 이메일 주소입니다.</EmailErrorMsg>
        )}
        <PasswordInput type="password" setInputData={setInputData}>
          비밀번호
        </PasswordInput>
        {!isPwValid && inputData.password.length !== 0 && (
          <PwErrorMsg>숫자와 영문자 조합 8자를 입력해 주세요</PwErrorMsg>
        )}
        <PasswordCheckInput type="passwordCheck" setInputData={setInputData}>
          비밀번호 확인
        </PasswordCheckInput>
        {inputData.passwordCheck.length !== 0 && !isCheckpwValid && (
          <PwCheckErrorMsg>비밀번호가 일치하지 않습니다.</PwCheckErrorMsg>
        )}
      </ScrollWrapper>
      <ButtonWrapper>
        <SignupBtn postData={postData} isDisable={!isButtonOn}>
          가입완료
        </SignupBtn>
      </ButtonWrapper>
    </SignupWrapper>
  );
}

export default Signup;

const SignupWrapper = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  padding: 40px 27px 60px 33px;
  background-color: white;
`;

const ScrollWrapper = styled.ScrollView`
  flex: 7;
  flex-direction: column;
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

const EmailErrorMsg = styled.Text`
  color: ${({theme}) => theme.red};
  font-size: 12px;
  line-height: 18px;
  margin-left: 15px;
  margin-bottom: 20px;
`;

const PwErrorMsg = styled(EmailErrorMsg)``;

const PwCheckErrorMsg = styled(EmailErrorMsg)``;

const ButtonWrapper = styled.View`
  flex: 1;
`;

const SignupBtn = styled(LoginSignupBtn)``;
