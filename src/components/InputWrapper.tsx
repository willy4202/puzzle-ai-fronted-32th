import React from 'react';
import styled from 'styled-components/native';
import {Text, View, TextInput} from 'react-native';
import {UserData, InputProps} from '~/types/type';

function InputWrapper({children, type, setUserData}: InputProps) {
  const inputHandler = (text: string, type: string) => {
    setUserData((prev: UserData) => ({...prev, [type]: text}));
  };

  return (
    <Wrapper>
      <InputTitle>{children}</InputTitle>
      <Input
        autoCapitalize="none"
        onChangeText={(text: string) => inputHandler(text, type)}
        placeholder={`${children}을 입력해주세요`}
      />
    </Wrapper>
  );
}

export default InputWrapper;

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
  color: black;
`;
