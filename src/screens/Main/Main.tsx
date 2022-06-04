import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../App';
import {SafeAreaView} from 'react-native-safe-area-context';
import Category1 from '@assets/images/1.png';
import Category2 from '@assets/images/2.png';
import Category3 from '@assets/images/3.png';
import Category4 from '@assets/images/4.png';
import Category5 from '@assets/images/5.png';
import Category6 from '@assets/images/6.png';
import Category7 from '@assets/images/7.png';
import Category8 from '@assets/images/8.png';
import Category9 from '@assets/images/9.png';

type MainNavigationProps = StackScreenProps<HomeStackParamList, 'Main'>;

const DATA = [
  {id: 1, url: Category1},
  {id: 2, url: Category2},
  {id: 3, url: Category3},
  {id: 4, url: Category4},
  {id: 5, url: Category5},
  {id: 6, url: Category6},
  {id: 7, url: Category7},
  {id: 8, url: Category8},
  {id: 9, url: Category9},
];

function Main({navigation}: MainNavigationProps) {
  console.log(Category1);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <>
      <SafeArea></SafeArea>
      <MainWrapper>
        <MainHeader>
          <UserWrapper>
            <UserName>김퍼즐</UserName>
            <HelloMent>님 반갑습니다.</HelloMent>
          </UserWrapper>
          <Comment>
            <Where>어디가</Where>
            <Another>불편하신가요?</Another>
          </Comment>
        </MainHeader>
        <MainContents
          data={DATA}
          renderItem={({item}) => (
            <CategoryButton onPress={() => navigation.navigate('DocList')}>
              <Category source={item.url} />
            </CategoryButton>
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          bounces={false}
        />
      </MainWrapper>
    </>
  );
}

export default Main;

const SafeArea = styled(SafeAreaView)`
  background-color: white;
`;

const MainWrapper = styled.View`
  flex: 1;
  padding: 0px 24px 0px;
  background-color: white;
`;

const MainHeader = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const UserWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
`;

const Comment = styled(UserWrapper)`
  margin-top: 7px;
`;

const UserName = styled.Text`
  font-weight: 700;
  font-size: ${({theme}) => theme.fontLarge};
  color: ${({theme}) => theme.primary};
  line-height: 33px;
`;

const HelloMent = styled.Text`
  line-height: 24px;
  margin-left: 8px;
  color: ${({theme}) => theme.REZSubmitTitle};
`;

const Where = styled(UserName)`
  font-weight: 400;
`;

const Another = styled(UserName)`
  margin-left: 7px;
`;

const MainContents = styled.FlatList`
  width: 100%;
  flex: 4;
` as unknown as typeof FlatList;

const CategoryButton = styled.Pressable``;

const Category = styled.Image`
  margin-top: 25px;
`;
