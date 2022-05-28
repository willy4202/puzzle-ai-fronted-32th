import React from 'react';
import {Text, View, Button} from 'react-native';

function Splash({navigation}: any) {
  return (
    <View>
      <Text>Main</Text>
      <Button
        title="go to Entry"
        onPress={() => navigation.navigate('Entry')}
      />
    </View>
  );
}

export default Splash;
