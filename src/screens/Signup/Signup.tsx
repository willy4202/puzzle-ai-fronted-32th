import React, {useState, useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import InputWrapper from '@components/InputWrapper';
import PasswordWrapper from '@components/PasswordWrapper';
import {UserData} from '~/types/type';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../App';
import LoginSignupBtn from '@components/LoginSignupBtn';
import {config} from '../../config';

type SignupNavigationProps = StackScreenProps<HomeStackParamList, 'Signup'>;

function Signup({navigation}: SignupNavigationProps) {
  const [userData, setUserData] = useState<UserData>({
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
    if (!!userData.email) {
      timer = setTimeout(() => {
        fetch(`${config.emailCheck}`, {
          method: 'POST',
          body: JSON.stringify({
            email: userData.email,
          }),
        })
          .then(res => res.json())
          .then(res => {
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
  }, [userData.email]);

  const isNameValid: boolean = useMemo(
    () => !!userData.firstName && !!userData.lastName,
    [userData.firstName, userData.lastName],
  );

  const isPwValid: boolean = useMemo(
    () =>
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,}$/.test(
        userData.password,
      ),
    [userData.password],
  );

  const isCheckpwValid: boolean = useMemo(
    () => userData.password === userData.passwordCheck,
    [userData.password, userData.passwordCheck],
  );

  const isButtonOn: boolean = useMemo(
    () => isNameValid && isEmailValid && isPwValid && isCheckpwValid,
    [isNameValid, isEmailValid, isPwValid, isCheckpwValid],
  );

  const postSignup = () => {
    fetch(`${config.signup}`, {
      method: 'POST',
      body: JSON.stringify({
        name: userData.lastName + userData.firstName,
        email: userData.email,
        password: userData.password,
        is_doctor: 'False',
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.message === 'signup success') {
          return Alert.alert('회원가입에 성공하셨습니다.');
        } else if (res.message === 'not in email format') {
          return Alert.alert('이메일형식이 잘못되었습니다.');
        }
      });
  };

  return (
    <SignupWrapper>
      <ScrollWrapper>
        <NameWrapper>
          <LastName>
            <LastNameWrapper type="lastName" setUserData={setUserData}>
              성
            </LastNameWrapper>
          </LastName>
          <FirstName>
            <FirstNameWrapper type="firstName" setUserData={setUserData}>
              이름
            </FirstNameWrapper>
          </FirstName>
        </NameWrapper>
        <EmailInput type="email" setUserData={setUserData}>
          이메일
        </EmailInput>
        {!!userData.email.length && !isEmailValid && (
          <EmailErrorMsg>존재하는 이메일 주소입니다.</EmailErrorMsg>
        )}
        <PasswordInput type="password" setUserData={setUserData}>
          비밀번호
        </PasswordInput>
        {!isPwValid && !!userData.password.length && (
          <PwErrorMsg>숫자와 영문자 조합 8자를 입력해 주세요</PwErrorMsg>
        )}
        <PasswordCheckInput type="passwordCheck" setUserData={setUserData}>
          비밀번호 확인
        </PasswordCheckInput>
        {!!userData.passwordCheck.length && !isCheckpwValid && (
          <PwCheckErrorMsg>비밀번호가 일치하지 않습니다.</PwCheckErrorMsg>
        )}
      </ScrollWrapper>
      <ButtonWrapper>
        <SignupBtn pressHandler={postSignup} disabled={!isButtonOn}>
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
