import {Dimensions} from 'react-native';

const ZEPLIN__WIDTH = 370;
const ZEPLIN__HEIGHT = 760;

export const responsiveWidth = (width: number) => {
  return ((Dimensions.get('window').width * width) / ZEPLIN__WIDTH).toFixed(2);
};

export const responsiveHeight = (height: number) => {
  return ((Dimensions.get('window').height * height) / ZEPLIN__HEIGHT).toFixed(
    2,
  );
};
