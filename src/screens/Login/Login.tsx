import React, {useState} from 'react';
import {Alert} from 'react-native';
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
        <InputTitle>아이디</InputTitle>
        <StyledTextInput placeholder="아이디를 입력해주세요" />
        <InputTitle>비밀번호</InputTitle>
        <InputContainer>
          <IconWrapper onTouchStart={() => showPwHandler()}>
            <InputIcon source={isShowPw ? closeEye : openEye} />
          </IconWrapper>
          <StyledTextInput
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={isShowPw}
          />
        </InputContainer>
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
  border: 1px solid ${props => props.theme.grey};
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

const BtnContainer = styled.View`
  flex: 1;
`;

const LoginBtn = styled.Button`
  width: 300px;
  height: 52px;
  background-color: red;
`;
