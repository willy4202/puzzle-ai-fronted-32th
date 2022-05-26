import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {Text, View, TextInput, Image} from 'react-native';

type children = {
  children: string;
};

type title = {
  title: string;
};

function InputWrapper({children}: children) {
  return (
    <Wrapper>
      <InputTitle>{children}</InputTitle>
      <Input title={children} />
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

const Input = styled.TextInput.attrs(({title}: title) => ({
  title: title,
  placeholder: `${title}을 입력해주세요`,
}))`
  width: 100%;
  height: 48px;
  border: 1px solid ${({theme}) => theme.grey};
  border-radius: 8px;
  padding: 15px;
  color: black;
`;
