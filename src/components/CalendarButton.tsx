import React from 'react';
import styled from 'styled-components/native';
import {Text, Pressable} from 'react-native';
import theme from '~/src/styles/theme';

interface CalBtnProps {
  children: string | number;
  type?: string;
}

function CalendarButton({children, type = ''}: CalBtnProps) {
  return (
    <CalendarBtn types={type}>
      <CalendarText types={type}>{children}</CalendarText>
    </CalendarBtn>
  );
}

export default CalendarButton;

const CalendarBtn = styled.Pressable<{types: string}>`
  align-items: center;
  width: ${({types}) => (types === 'week' ? '14px' : '17px')};
  height: 22px;
`;

const CalendarText = styled.Text<{types: string}>`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({types}) =>
    types === 'week'
      ? ({theme}) => theme.primary
      : ({theme}) => theme.DOCSchemeCalFont};
  opacity: ${({children}) => (children === 0 ? 0 : 1)};
`;
