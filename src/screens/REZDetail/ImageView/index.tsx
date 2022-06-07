import styled from 'styled-components/native';
import React, {useContext} from 'react';
import {Asset} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';

const ImageView = ({image}) => {
  return (
    <Container>
      {/* TODO : 이미지가 안들어올 경우 && 연산자로 null 처리하기  */}
      <ViewTitle>환부 사진</ViewTitle>

      <ScrollView horizontal>
        {image.map(item => (
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
