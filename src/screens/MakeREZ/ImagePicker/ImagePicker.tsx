import {Pressable, Text, View} from 'react-native';
import React, {SetStateAction} from 'react';
import styled from 'styled-components/native';
import testImg from 'assets/images/ic-close-eye.png';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

type OptionType = {
  maxHeight: number;
  maxWidth: number;
  selectionLimit: number;
  mediaType: string;
  includeBase64: boolean;
};

const options: ImageLibraryOptions = {
  maxHeight: 200,
  maxWidth: 200,
  selectionLimit: 3,
  mediaType: 'photo',
  includeBase64: false,
};

interface Props {
  selectImage: [];
  setSelectImage: React.Dispatch<SetStateAction<never[]>>;
}

function ImagePicker({selectImage, setSelectImage}: Props) {
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setSelectImage(result.assets);
  };
  // console.log('stateImg', selectImage);

  const handleDelete = e => {
    // const deleteImg = selectImage.filter()
    console.log(e.target._nativeTag);
  };

  return (
    <ImageView>
      <ViewTitle>환부 사진 업로드(선택)</ViewTitle>
      <ImageContainer>
        {selectImage.map(item => (
          <View key={item.fileName}>
            <Pressable onPress={e => handleDelete(e)}>
              <Text>hi</Text>
            </Pressable>
            <TestView>
              <TestImage source={item} />
            </TestView>
          </View>
        ))}
        {selectImage.length < 3 && (
          <TestView onPress={openGallery}>
            <TestImage source={testImg} />
          </TestView>
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
  margin: 15px;
  background-color: yellowgreen;
  align-items: center;
`;

const TestView = styled.Pressable`
  height: 100%;
  width: 120px;
`;

const TestImage = styled.Image`
  height: 100%;
  width: 100%;
`;
