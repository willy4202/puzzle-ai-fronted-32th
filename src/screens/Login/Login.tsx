import React, {useState} from 'react';
import {BackHandler} from 'react-native';
import styled from 'styled-components/native';
import logo from '../../assets/images/logo.png';
import closeEye from '../../assets/images/ic-close-eye.png';
import openEye from '../../assets/images/ic-open-eye.png';
import LoginSignupBtn from '../../components/LoginSignupBtn';

function Login() {
  const [isShowPw, setIsShowPw] = useState(true);

  function showPwHandler() {
    setIsShowPw(prev => !prev);
  }

  return (
    <AvoidingView>
      <ViewContainer>
        <LogoView>
          <Logo source={logo} />
        </LogoView>
        <FormContainer>
          <InputTitle>아이디</InputTitle>
          <StyledTextInput placeholder="아이디를 입력해주세요" />
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
            />
          </InputContainer>
        </FormContainer>
        <LoginSignupBtn text="로그인" />
      </ViewContainer>
    </AvoidingView>
  );
}

export default Login;

const AvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 0 30px 60px 30px;
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
  flex: 4;
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
  font-size: 12px;
  line-height: 18px;
  margin: 20px 0 5px 0;
  color: black;
`;
