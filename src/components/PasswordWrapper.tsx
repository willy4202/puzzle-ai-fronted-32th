import React, {useState} from 'react';
import styled from 'styled-components/native';
import ClosedEyes from '@assets/images/ic-close-eye.png';
import OpenEyes from '@assets/images/ic-open-eye.png';
import {UserData, InputProps} from '~/src/types/type';

function PasswordWrapper({children, type, setUserData}: InputProps) {
  const [isShow, setIsShow] = useState(true);

  const inputHandler = (text: string, type: string) => {
    setUserData((prev: UserData) => ({...prev, [type]: text}));
  };

  return (
    <Wrapper>
      <InputTitle>{children}</InputTitle>
      <Input
        secureTextEntry={isShow}
        onChangeText={text => inputHandler(text, type)}
        autoCapitalize="none"
        placeholder={
          type === 'passwordCheck'
            ? '비밀번호를 다시 입력해주세요'
            : '비밀번호를 입력해주세요'
        }
      />
      <IconWrapper onTouchStart={() => setIsShow(!isShow)}>
        <ShowButton source={isShow ? ClosedEyes : OpenEyes} />
      </IconWrapper>
    </Wrapper>
  );
}

export default PasswordWrapper;

const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 7px;
`;

const InputTitle = styled.Text`
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 7px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 48px;
  border: 1px solid ${({theme}) => theme.grey};
  border-radius: 8px;
  padding: 15px;
`;

const IconWrapper = styled.View``;

const ShowButton = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  position: absolute;
  bottom: 16px;
  right: 15px;
  width: 16px;
  height: 16px;
`;
