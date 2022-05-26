import React from 'react';
import {Text, View, Button} from 'react-native';

function Splash({navigation}: any) {
  return (
    <View>
      <Text>Main</Text>
      <Button
        title="go to Entry"
<<<<<<< HEAD
        onPress={() => navigation.navigate('Login')}
=======
        onPress={() => navigation.navigate('Signup')}
>>>>>>> bdab894 (정덕우 회원가입 레이아웃완료 및 네비게이션 수정)
      />
    </View>
  );
}

export default Splash;
