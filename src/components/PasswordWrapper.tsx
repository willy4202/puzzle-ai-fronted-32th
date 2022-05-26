import React from 'react';
import styled from 'styled-components/native';
import {Text, View, TextInput, Image} from 'react-native';
<<<<<<< HEAD
import ClosedEyes from '../assets/images/icon_feather_eye_off.png';
=======
>>>>>>> bdab8948d0b5cc06d8ef45745faecb90fb34377b

interface props {
  children: string;
  type?: string;
}

<<<<<<< HEAD
function PasswordWrapper({children, type = ''}: props) {
  return (
    <Wrapper>
      <InputTitle>{children}</InputTitle>
      <Input
        placeholder={
          type === 'check'
            ? '비밀번호를 다시 입력해주세요'
            : '비밀번호를 입력해주세요'
        }></Input>
=======
interface type {
  type: string;
}

function PasswordWrapper({children, type}: props) {
  return (
    <Wrapper>
      <InputTitle>{children}</InputTitle>
      <Input type={type}></Input>
>>>>>>> bdab8948d0b5cc06d8ef45745faecb90fb34377b
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

<<<<<<< HEAD
const Input = styled.TextInput`
=======
const Input = styled.TextInput.attrs(({type}: type) => ({
  type: type,
  placeholder:
    type === 'check'
      ? '비밀번호를 다시 입력해주세요'
      : '비밀번호를 입력해주세요',
}))`
>>>>>>> bdab8948d0b5cc06d8ef45745faecb90fb34377b
  width: 100%;
  height: 48px;
  border: 1px solid ${({theme}) => theme.grey};
  border-radius: 8px;
  padding: 15px;
`;

const ShowButton = styled.Image.attrs(() => ({
<<<<<<< HEAD
  source: ClosedEyes,
=======
  source: require('../assets/images/icon_feather_eye_off.png'),
>>>>>>> bdab8948d0b5cc06d8ef45745faecb90fb34377b
  resizeMode: 'contain',
}))`
  position: absolute;
  bottom: 16px;
  right: 15px;
  width: 16px;
  height: 16px;
`;
