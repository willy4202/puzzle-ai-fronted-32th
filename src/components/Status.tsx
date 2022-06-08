import React, {ReactNode} from 'react';
import {Pressable, Text, View} from 'react-native';
import styled, {css} from 'styled-components/native';

interface Props {
  children: ReactNode;
  status: string;
}

interface StyledProps {
  status: string;
}

function Status({children, status}: Props) {
  return (
    <View>
      <StatusTitle status={status}>{children}</StatusTitle>
    </View>
  );
}

export default Status;

const StatusTitle = styled.Text<StyledProps>`
  padding: 2px 10px;
  font-size: ${({theme}) => theme.fontSmall};
  ${({status, theme}) => {
    switch (status) {
      case '진료대기':
        return css`
          color: ${theme.StatusWaitingFont};
          background-color: ${theme.StatusWaitingBack};
          border: 1px solid ${theme.StatusWaitingBorder};
        `;
      case '진료완료':
        return css`
          color: ${theme.StatusFinFont};
          background-color: ${theme.StatusFinBack};
          border: 1px solid ${theme.StatusFinBorder};
        `;
      case '진료취소':
        return css`
          color: ${theme.StatusCancleFont};
          background-color: ${theme.StatusCancleBack};
          border: 1px solid ${theme.StatusCancleBorder};
        `;
    }
  }}
`;
