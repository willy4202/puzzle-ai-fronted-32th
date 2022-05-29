import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Alert} from 'react-native';
import logo from 'assets/images/logo.png';
import closeEye from 'assets/images/ic-close-eye.png';
import openEye from 'assets/images/ic-open-eye.png';
import LoginSignupBtn from '@components/LoginSignupBtn';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '@screens/../config';

type NavigationProps = StackScreenProps<HomeStackParamList, 'Login'>;

function Login({navigation}: NavigationProps) {
  const [isShowPw, setIsShowPw] = useState(true);
  const [userInfo, setUserInfo] = useState({email: '', pw: ''});

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerShadowVisible: false,
    });
  }, [navigation]);

  function showPwHandler(): void {
    setIsShowPw(prev => !prev);
  }

  function userInfoHandler(text: string, type: string): void {
    setUserInfo({...userInfo, [type]: text});
  }

  const storeToken = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error('cookie 저장 실패');
    }
  };

  const postData = async () => {
    const response = await fetch(config.check, {
      method: 'POST',
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.pw,
      }),
    });
    const data = await response.json();
    switch (data.message) {
      case 'signin success':
        storeToken('cookie', data.cookie);
        navigation.navigate('Main');
        break;
      case 'please signin on app for doctor':
        Alert.alert('의사는 전용 앱으로 로그인 해주세요.');
        break;
      default:
        Alert.alert('비밀번호와 이메일을 확인해주세요.');
    }
  };

  return (
    <AvoidingView>
      <ViewContainer>
        <LogoView>
          <Logo source={logo} />
        </LogoView>
        <FormContainer>
          <InputTitle>아이디</InputTitle>
          <StyledTextInput
            placeholder="아이디를 입력해주세요"
            onChangeText={text => userInfoHandler(text, 'email')}
            keyboardType="email-address"
            autoCapitalize="none"
            value={userInfo.email}
          />
          <InputTitle>비밀번호</InputTitle>
          <InputContainer>
            <IconWrapper
              onTouchStart={() => showPwHandler()}
              hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
              <InputIcon source={isShowPw ? closeEye : openEye} />
            </IconWrapper>
            <StyledTextInput
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry={isShowPw}
              onChangeText={text => userInfoHandler(text, 'pw')}
            />
          </InputContainer>
        </FormContainer>
        <BtnContainer>
          <LoginSignupBtn postData={postData}>로그인</LoginSignupBtn>
        </BtnContainer>
      </ViewContainer>
    </AvoidingView>
  );
}

export default Login;

const AvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 20px 30px 30px 30px;
  background-color: white;
`;

const ViewContainer = styled.View`
  flex: 1;
`;

const LogoView = styled.View`
  flex: 1;
  align-self: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 156.8px;
  height: 60px;
`;

const FormContainer = styled.View`
  flex: 6;
  width: 100%;
  padding: 0 15px;
  margin-top: 129px;
  align-self: center;
`;

const StyledTextInput = styled.TextInput`
  height: 48px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${({theme}) => theme.grey};
`;

const InputContainer = styled.View`
  position: relative;
`;

const IconWrapper = styled.View`
  position: absolute;
  top: 17px;
  right: 20.3px;
  z-index: 20;
`;

const InputIcon = styled.Image`
  width: 14.7px;
  height: 14.7px;
`;

const InputTitle = styled.Text`
  margin-left: 10px;
  font-size: ${({theme}) => theme.fontSmall};
  line-height: ${({theme}) => theme.lineHeightSmall};
  margin: 20px 0 5px 0;
  color: black;
`;

const BtnContainer = styled.View`
  flex: 1;
  top: 10px;
`;
