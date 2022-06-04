import styled from 'styled-components/native';
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {SelectImageContext} from '~/src/ReservationContext';
import {Asset} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';

const ImageView = () => {
  const {selectImage} = useContext(SelectImageContext);

  const array = [1, 2, 3, 4, 5];

  return (
    <Container>
      {/* TODO : 이미지가 안들어올 경우 && 연산자로 null 처리하기  */}
      <ViewTitle>환부 사진</ViewTitle>
      {/* 원래 데이터타입은 Asset, 임시로 any 지정 , 사진 가로 스크롤뷰로 설정*/}
      <ScrollView horizontal>
        {array.map((item: any) => (
          <SelectImgWrapper key={item.fileName}>
            <ImageWrapper>
              <SpreadImg source={item} />
            </ImageWrapper>
          </SelectImgWrapper>
        ))}
      </ScrollView>
    </Container>
  );
};

export default ImageView;

const Container = styled.View`
  margin-bottom: 20px;
`;

const ViewTitle = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: ${({theme}) => theme.fontRegular};
  line-height: ${({theme}) => theme.lineHeightRegular};
`;

const ImageWrapper = styled.Pressable`
  background-color: ${({theme}) => theme.MakeREZInputBack};
`;

const SelectImgWrapper = styled.View`
  margin: 5px;
  overflow: hidden;
  background-color: ${({theme}) => theme.MakeREZInputBack};
`;

const SpreadImg = styled.Image`
  height: 106px;
  width: 106px;
`;
