import React, {useEffect, useContext} from 'react';
import {Dimensions, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {REZListNavigationProps, REZListProp} from '~/src/types/type';
import DoctorCard from '@components/DoctorCard';
import CalendarImage from '@assets/images/calendar_icon.png';
import {DocInfoContext} from '~/src/ReservationContext';
import Status from '~/src/components/Status';
import usePagination from '~/src/components/usePagination';

const deviceHeight: number = Dimensions.get('window').height;

const renderItemNum: number = Math.floor(deviceHeight / 150);

function REZList({navigation}: REZListNavigationProps) {
  const {setDocInfo} = useContext(DocInfoContext);

  const {paginationItem, addList} = usePagination(renderItemNum);

  useEffect(() => {
    navigation.setOptions({title: '예약 목록', headerShadowVisible: false});
  });

  const goREZDetail = (docInfo: REZListProp) => {
    setDocInfo(docInfo);
    navigation.navigate('REZDetail');
  };

  const renderItem = ({item}: {item: REZListProp}) => (
    <ListButton onPress={() => goREZDetail(item)}>
      <ListHeader>
        <DateWrapper>
          <CalendarIcon source={CalendarImage} resizeMode="contain" />
          <DateText>{`${item.date} ${item.time}`}</DateText>
        </DateWrapper>
        <Status>{item.status_name}</Status>
      </ListHeader>
      <DoctorCard docData={item}></DoctorCard>
    </ListButton>
  );

  return (
    <REZListWrapper
      data={paginationItem}
      renderItem={renderItem}
      onEndReached={addList}
      onEndReachedThreshold={0}
    />
  );
}

export default REZList;

const REZListWrapper = styled.FlatList`
  flex: 1;
  padding: 0px 18px 0px;
  background-color: white;
` as unknown as typeof FlatList;

const ListButton = styled.Pressable`
  width: 100%;
`;
const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 0px 24px;
`;

const DateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CalendarIcon = styled.Image``;

const DateText = styled.Text`
  font-size: ${({theme}) => theme.fontRegular};
  color: ${({theme}) => theme.REZListBtnFont};
  line-height: 22.2px;
  margin-left: 10.17px;
`;
