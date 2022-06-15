import React, {useContext, useEffect} from 'react';
import styled from 'styled-components/native';
import {Dimensions, FlatList} from 'react-native';
import {DocListNavigationProps, DocListProp} from '~/src/types/type';
import DoctorCard from '@components/DoctorCard';
import {DocInfoContext} from '~/src/ReservationContext';
import usePagination from '@components/usePagination';

const deviceHeight: number = Dimensions.get('window').height;

const renderItemNum: number = Math.floor(deviceHeight / 100);

function DocList({navigation, route}: DocListNavigationProps) {
  useEffect(() =>
    navigation.setOptions({
      title: route.params.name,
      headerShadowVisible: false,
    }),
  );

  const {setDocInfo} = useContext(DocInfoContext);

  const {paginationItem, addList} = usePagination(renderItemNum);

  const goDocScheme = (docInfo: DocListProp) => {
    setDocInfo(docInfo);
    navigation.navigate('DocScheme');
  };

  function renderItem({item}: {item: DocListProp}): JSX.Element {
    return (
      <ListButton onPress={() => goDocScheme(item)}>
        <DoctorCard docData={item}></DoctorCard>
      </ListButton>
    );
  }

  console.log(paginationItem);

  return (
    <DocListWrapper
      data={paginationItem}
      renderItem={renderItem}
      onEndReached={addList}
      onEndReachedThreshold={0}
    />
  );
}

export default DocList;

const DocListWrapper = styled.FlatList`
  flex: 1;
  padding: 0px 18px 0px;
  background-color: white;
` as unknown as typeof FlatList;

const ListButton = styled.Pressable`
  width: 100%;
  padding-top: 26px;
`;
