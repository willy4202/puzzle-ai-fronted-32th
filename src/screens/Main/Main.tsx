import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components/native';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {config} from '~/src/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MainNavigationProps,
  MainDataProp,
  CategoryProp,
} from '~/src/types/type';

function Main({navigation}: MainNavigationProps) {
  const [initialData, setInitialData] = useState<MainDataProp>({
    result: [],
    name: '',
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    const getToken = async () => {
      const Token = await AsyncStorage.getItem('token');
      return String(Token);
    };

    const fetchData = async () => {
      fetch(`${config.mains}`, {
        headers: {
          Authorization: await getToken(),
        },
      })
        .then(res => res.json())
        .then(res => setInitialData(res));
    };

    fetchData();
  }, []);

  console.log(initialData);

  const goDocList = (item: CategoryProp) => {
    navigation.navigate('DocList', item);
  };

  return (
    <>
      <SafeArea></SafeArea>
      <MainWrapper>
        <MainHeader>
          <UserWrapper>
            <UserName>{initialData.name}</UserName>
            <HelloMent>님 반갑습니다.</HelloMent>
          </UserWrapper>
          <Comment>
            <Where>어디가</Where>
            <Another>불편하신가요?</Another>
          </Comment>
        </MainHeader>
        <MainContents
          data={initialData.result}
          renderItem={({item}) => (
            <CategoryButton onPress={() => goDocList(item)}>
              <Category
                id={item.id}
                source={{uri: item.file_location}}
                resizeMode="contain"
              />
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

const Category = styled.Image<{id: number}>`
  width: 70px;
  ${({id}) => {
    if (id === 4 || id === 6 || id === 8) {
      return css`
        height: 117px;
      `;
    } else {
      return css`
        height: 95px;
      `;
    }
  }};
  margin-top: 25px;
`;
