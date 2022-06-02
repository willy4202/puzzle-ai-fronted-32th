import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {SelectImageContext} from '~/src/ReservationContext';
import cameraImg from 'assets/images/reservation-photo-icon.png';
import deleteBtn from 'assets/images/delet-btn.png';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
  // ImagePickerResponse,
} from 'react-native-image-picker';

const options: ImageLibraryOptions = {
  maxHeight: 200,
  maxWidth: 200,
  selectionLimit: 3,
  mediaType: 'photo',
  includeBase64: false,
};

function ImagePicker() {
  const {selectImage, setSelectImage} = useContext(SelectImageContext);

  const openGallery = (): void => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setSelectImage(prev => [...prev, ...response.assets]);
      }
    });
  };

  // const openGallery = async () => {
  //   const result = await launchImageLibrary(options, res => {
  //     console.log(res);
  //     if (res.didCancel) {
  //       console.log('user cancelled image picker');
  //     } else {
  //       console.log('res', JSON.stringify(res));
  //     }
  //   });
  //   setSelectImage(prev => [...prev, ...result.assets]);
  // };

  const handleDelete = (name: string): void => {
    setSelectImage(selectImage.filter(item => item.fileName !== name));
  };

  return (
    <ImageView>
      <ViewTitle>환부 사진 업로드(선택)</ViewTitle>
      <ImageContainer>
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
        {selectImage.length < 3 && (
          <ImageWrapper onPress={openGallery}>
            <CameraLogo source={cameraImg} />
          </ImageWrapper>
        )}
      </ImageContainer>
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
  margin: 0 18px 0 18px;
`;

const ImageContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 4% 2%;
  align-items: center;
  height: 100%;
  width: 33%;
`;

const ImageWrapper = styled.Pressable`
  height: 100%;
  width: 100%;
  margin: 0 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.MakeREZInputBack};
`;

const SelectImgWrapper = styled.View`
  height: 100%;
  width: 100%;
  margin: 5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${({theme}) => theme.MakeREZInputBack};
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
