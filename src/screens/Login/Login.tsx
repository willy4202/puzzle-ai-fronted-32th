import React, {useState} from 'react';
import {Button, Alert, Image} from 'react-native';
import styled from 'styled-components/native';

import logo from '../../assets/images/logo.png';
import closeEye from '../../assets/images/ic-back-arrow.png';
import openEye from '../../assets/images/ic-no-arrow.png';

function Login() {
  const [isShowPw, setIsShowPw] = useState(true);

  function showPwHandler() {
    setIsShowPw(prev => !prev);
  }

  return (
    <ViewContainer>
      <LogoView>
        <Logo source={logo} />
      </LogoView>
      <FormContainer>
        <InputWrapper>
          <InputTitle>아이디</InputTitle>
          <StyledTextInput placeholder="아이디를 입력해주세요" />
        </InputWrapper>
        <InputWrapper>
          <InputTitle>비밀번호</InputTitle>
          <InputContainer>
            <InputIcon
              // onPress={showPwHandler}
              source={isShowPw ? closeEye : openEye}
            />
            <StyledTextInput
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry={isShowPw}
            />
          </InputContainer>
        </InputWrapper>
      </FormContainer>
      <BtnContainer>
        <LoginBtn title="로그인" onPress={() => Alert.alert('로그인 완료')} />
      </BtnContainer>
    </ViewContainer>
  );
}

export default Login;

const ViewContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const LogoView = styled.View`
  flex: 1;
  align-self: center;
`;

const Logo = styled.Image`
  width: 156.8px;
  height: 60px;
`;

const FormContainer = styled.View`
  flex: 6;
  width: 300px;
  align-self: center;
  justify-content: center;
`;

const StyledTextInput = styled.TextInput`
  height: 48px;
  margin: 10px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.grey};
`;

const InputWrapper = styled.View``;

const InputContainer = styled.View`
  position: relative;
`;

const InputIcon = styled.Image`
  position: absolute;
  top: 26px
  right: 20.3px;
  width: 18px;
  height: 14px;
`;

const InputTitle = styled.Text`
  margin-left: 10px;
`;

const BtnContainer = styled.View`
  flex: 1;
`;

const LoginBtn = styled.Button`
  width: 300px;
  height: 52px;
  background-color: ${({theme}) => theme.primary};
`;
