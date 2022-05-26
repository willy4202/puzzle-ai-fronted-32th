import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {Text, View, TextInput, Image} from 'react-native';

type Children = {
  children: string;
};

function InputWrapper({children}: Children) {
  return (
    <Wrapper>
      <InputTitle>{children}</InputTitle>
      <Input placeholder={`${children}을 입력해주세요`} />
    </Wrapper>
  );
}

export default InputWrapper;

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
  color: black;
`;
