import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

function Status() {
  return (
    <View>
      <StatusTitle>{status}</StatusTitle>
    </View>
  );
}

export default Status;
const StatusTitle = styled.Text`
  background-color: yellow;
  padding: 2px 10px;
`;
