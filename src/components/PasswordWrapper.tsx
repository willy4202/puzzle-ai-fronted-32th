import React from 'react';
import styled from 'styled-components/native';
import {Text, View, TextInput, Image} from 'react-native';
import ClosedEyes from '../assets/images/icon_feather_eye_off.png';

interface Props {
  children: string;
  type?: string;
}

function PasswordWrapper({children, type = ''}: Props) {
  return (
    <Wrapper>
      <InputTitle>{children}</InputTitle>
      <Input
        placeholder={
          type === 'check'
            ? '비밀번호를 다시 입력해주세요'
            : '비밀번호를 입력해주세요'
        }></Input>
      <ShowButton />
    </Wrapper>
  );
}

export default PasswordWrapper;

const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 20px;
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

const ShowButton = styled.Image.attrs(() => ({
  source: ClosedEyes,
  resizeMode: 'contain',
}))`
  position: absolute;
  bottom: 16px;
  right: 15px;
  width: 16px;
  height: 16px;
`;
