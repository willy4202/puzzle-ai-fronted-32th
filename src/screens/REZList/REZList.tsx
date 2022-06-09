import React, {useEffect, useState, useContext} from 'react';
import {Dimensions, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {REZListNavigationProps, InitialDocListProp} from '~/src/types/type';
import DoctorCard from '@components/DoctorCard';
import CalendarImage from '@assets/images/calendar_icon.png';
import {DocInfoContext} from '~/src/ReservationContext';

const DATA: InitialDocListProp[] = [];
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

const renderItemNum: number = Math.floor(deviceHeight / 125);

function REZList({navigation}: REZListNavigationProps) {
  const [initialDocData, setInitialDocData] = useState(
    DATA.slice(0, renderItemNum),
  );

  const {setDocInfo} = useContext(DocInfoContext);

  useEffect(() => {
    navigation.setOptions({title: '예약 목록', headerShadowVisible: false});
  });

  const goDocScheme = (docInfo: InitialDocListProp) => {
    setDocInfo(docInfo);
    navigation.navigate('REZDetail');
  };

  const renderItem = ({item}: {item: InitialDocListProp}) => (
    <ListButton onPress={() => goDocScheme(item)}>
      <ListHeader>
        <DateWrapper>
          <CalendarIcon source={CalendarImage} resizeMode="contain" />
          <DateText>2020-07-24(금) 오후 3:00</DateText>
        </DateWrapper>
        {/* todo : 스테이터스 컴포넌트 완료되면 불러오기 */}
      </ListHeader>
      <DoctorCard docData={item}></DoctorCard>
    </ListButton>
  );

  return <REZListWrapper data={initialDocData} renderItem={renderItem} />;
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
