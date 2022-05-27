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

  const postData = async () => {
    fetch(config.signin, {
      method: 'POST',
      body: JSON.stringify({
        email: 'patient1@gmail.com',
        password: '1q2w3e42r',
      }),
    })
      .then(res => res.json())

      .then(data => AsyncStorage.setItem('cookie', data.cookie));
    const value = await AsyncStorage.getItem('cookie');
    if (value) {
      navigation.navigate('Main');
    } else {
      AsyncStorage.removeItem('cookie');
      Alert.alert('이메일과 비밀번호를 확인해주세요.');
    }
  };

  // AsyncStorage.removeItem('cookie'); 쿠키 확인 및 테스트용 코드

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
          <LoginSignupBtn
            id="Main"
            postData={postData}
            navigate={navigation.navigate}>
            로그인
          </LoginSignupBtn>
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
  width: 300px;
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
