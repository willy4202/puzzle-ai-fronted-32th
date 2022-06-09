import React, {useContext, useEffect} from 'react';
import styled from 'styled-components/native';
import {Dimensions, FlatList} from 'react-native';
import {DocListNavigationProps, DocDataProp} from '~/src/types/type';
import DoctorCard from '@components/DoctorCard';
import {DocInfoContext} from '~/src/ReservationContext';
import usePagination from '~/src/components/usePagination';

const DATA: DocDataProp[] = [];
for (let i = 0; i < 100; i++) {
  DATA.push({
    id: i,
    name: '의사' + i,
    subject: 'COVID-19',
    hospital: '병원1',
    profile_image:
      '192.168.0.114:8000/media/doctors_profile_images/default.png',
  });
}

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

  const {renderItemInfo, addList} = usePagination<DocDataProp>(
    renderItemNum,
    DATA,
  );

  const goDocScheme = (docInfo: DocDataProp) => {
    setDocInfo(docInfo);
    navigation.navigate('DocScheme');
  };

  function renderItem({item}: {item: DocDataProp}): JSX.Element {
    return (
      <ListButton onPress={() => goDocScheme(item)}>
        <DoctorCard docData={item}></DoctorCard>
      </ListButton>
    );
  }

  return (
    <DocListWrapper
      data={renderItemInfo}
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
