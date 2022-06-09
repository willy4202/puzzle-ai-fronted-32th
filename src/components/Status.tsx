import React, {ReactNode} from 'react';
import {View} from 'react-native';
import styled, {css} from 'styled-components/native';

interface Props {
  children: ReactNode;
}

function Status({children}: Props) {
  return (
    <View>
      <StatusTitle>{children}</StatusTitle>
    </View>
  );
}

export default Status;

const StatusTitle = styled.Text<Props>`
  padding: 2px 10px;
  font-size: ${({theme}) => theme.fontSmall};
  ${({children, theme}) => {
    switch (children) {
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
