import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {SelectImageContext} from '~/src/ReservationContext';
import cameraImg from 'assets/images/reservation-photo-icon.png';
import deleteBtn from 'assets/images/delet-btn.png';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import {useWindowDimensions} from 'react-native';
import {responsiveWidth} from '~/src/styles/responsive';

const options: ImageLibraryOptions = {
  maxHeight: 200,
  maxWidth: 200,
  selectionLimit: 6,
  mediaType: 'photo',
  includeBase64: false,
};

function ImagePicker() {
  const {selectImage, setSelectImage} = useContext(SelectImageContext);
  const {height, width} = useWindowDimensions();

  console.log(height, width);

  console.log(responsiveWidth(100));

  const openGallery = (): void => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setSelectImage(prev => [...prev, ...response.assets]);
      }
    });
  };

  const handleDelete = (name: string): void => {
    setSelectImage(selectImage.filter(item => item.fileName !== name));
  };

  return (
    <ImageView>
      <ViewTitle>환부 사진 업로드(선택)</ViewTitle>
      <ScrollViewContainer horizontal>
        {selectImage.length < 6 && (
          <ImageWrapper onPress={openGallery}>
            <CameraLogo source={cameraImg} />
          </ImageWrapper>
        )}
        {selectImage.map((item: Asset) => (
          <SelectImgWrapper key={item.fileName}>
            <DeleteWrapper onPress={() => handleDelete(item.fileName)}>
              <DeleteImg source={deleteBtn} />
            </DeleteWrapper>
            <ImageWrapper>
              <SpreadImg source={item} />
            </ImageWrapper>
          </SelectImgWrapper>
        ))}
      </ScrollViewContainer>
    </ImageView>
  );
}

export default ImagePicker;

const ImageView = styled.View`
  flex: 2;
`;

const ViewTitle = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: ${({theme}) => theme.fontRegular};
  line-height: ${({theme}) => theme.lineHeightRegular};
  margin: 0 20px;
`;

const ScrollViewContainer = styled.ScrollView`
  margin: 20px;
`;

const ImageWrapper = styled.Pressable`
  width: 110px;
  height: 110px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.MakeREZInputBack};
`;

const SelectImgWrapper = styled.View`
  margin: 0 5px;
  overflow: hidden;
`;

const SpreadImg = styled.Image`
  height: 100%;
  width: 100%;
`;

const CameraLogo = styled.Image`
  height: 24%;
  width: 27%;
`;

const DeleteWrapper = styled.TouchableOpacity`
  position: relative;
  width: 100%;
  z-index: 10;
`;

const DeleteImg = styled.Image`
  position: absolute;
  top: 10px;
  right: 6%;
  z-index: 20;
`;
