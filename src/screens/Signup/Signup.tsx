import React, {useState, useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {Alert} from 'react-native';
import InputWrapper from '@components/InputWrapper';
import PasswordWrapper from '@components/PasswordWrapper';
import {SignupUserData, SignupNavigationProps} from '~/src/types/type';
import LoginSignupBtn from '@components/LoginSignupBtn';
import {config} from '~/src/config';

function Signup({navigation}: SignupNavigationProps) {
  const [userData, setUserData] = useState<SignupUserData>({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [isSameEmail, setIsSameEmail] = useState(true);

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
      if (isEmailValid) {
        timer = setTimeout(() => {
          fetch(`${config.emailCheck}`, {
            method: 'POST',
            body: JSON.stringify({
              email: userData.email,
            }),
          })
            .then(res => res.json())
            .then(res => {
              if (res.message === 'email unique check pass') {
                setIsSameEmail(true);
              } else {
                setIsSameEmail(false);
              }
            });
        }, 600);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [userData.email]);

  const isNameValid: boolean = useMemo(
    () => !!userData.firstName && !!userData.lastName,
    [userData.firstName, userData.lastName],
  );

  const isEmailValid: boolean = useMemo(
    () =>
      /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9-.]+$/.test(userData.email),
    [userData.email],
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
    () =>
      isNameValid && isEmailValid && isSameEmail && isPwValid && isCheckpwValid,
    [isNameValid, isSameEmail, isPwValid, isCheckpwValid, isEmailValid],
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
        if (res.message === 'signup success') {
          return Alert.alert('회원가입에 성공하셨습니다.');
        } else {
          return Alert.alert('입력정보를 확인하신 후 다시 시도해주세요');
        }
      });
    navigation.navigate('Entry');
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
        {!!userData.email.length && !isEmailValid ? (
          <EmailValidErrorMsg>이메일 형식이 잘못되었습니다.</EmailValidErrorMsg>
        ) : (
          !isSameEmail && (
            <EmailErrorMsg>존재하는 이메일 주소입니다.</EmailErrorMsg>
          )
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
  padding: 40px 27px 30px 33px;
  background-color: white;
`;

const ScrollWrapper = styled.ScrollView`
  flex: 10;
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

const EmailValidErrorMsg = styled(EmailErrorMsg)``;

const PwErrorMsg = styled(EmailErrorMsg)``;

const PwCheckErrorMsg = styled(EmailErrorMsg)``;

const ButtonWrapper = styled.View`
  flex: 1;
`;

const SignupBtn = styled(LoginSignupBtn)``;
